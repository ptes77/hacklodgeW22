// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

interface RVotes {
    function awardReputation(address to) external;
    function isOwner(address owner) external view returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}

contract Voting {
    enum State {Running, Completed, Canceled}
    struct Topic {
        string prompt;
        uint numOptions;
        address proposer;
        State state;
        uint endBlock;
        address[] voters;
        mapping(address => uint) votes;
        mapping(uint => uint) tallies;
    }

    mapping(uint => Topic) public topics;
    uint public nextTopicNumber;
    address public RVotesAddr;

    constructor() {
        nextTopicNumber = 0;
        RVotesAddr = 0xd9145CCE52D386f254917e481eB44e9943F39138;
    }

    function setState(uint topic_id) private {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        if (topic.state == State.Canceled) {
            return;
        } else if (block.number <= topic.endBlock) {
            topic.state = State.Running;
        } else {
            topic.state = State.Completed;
        }
    }

    function createTopic(string memory _prompt, uint _numOptions, uint _votingDuration) public {
        // check address is member of DAO
        require(RVotes(RVotesAddr).isOwner(msg.sender));
        Topic storage topic = topics[nextTopicNumber];
        topic.prompt = _prompt;
        topic.numOptions = _numOptions;
        topic.proposer = msg.sender;
        topic.endBlock = block.number + _votingDuration / 15;
        topic.state = State.Running;
        nextTopicNumber++;
    }

    function vote(uint topic_id, uint optionNo) public returns (bool) {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        setState(topic_id);
        // optionNo is 1-indexed!!
        require(optionNo > 0 && optionNo <= topic.numOptions, "Not a valid option");
        require(topic.state == State.Running, "Vote must be currently running");
        // check address is member of DAO
        require(RVotes(RVotesAddr).isOwner(msg.sender), "You are not a member of the DAO");
        // make sure caller hasn't already voted
        require(topic.votes[msg.sender] == 0, "You have already voted");
        topic.votes[msg.sender] = optionNo;
        topic.voters.push(msg.sender);
        topic.tallies[optionNo] += 1;

        return true;
    }

    function getWinningOption(uint topic_id) private returns(uint) {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        setState(topic_id);
        require(topic.state == State.Completed, "Voting is not complete");
        uint winner = 0;
        uint winnerNoOfVotes = 0;
        for(uint i = 1; i <= topic.numOptions; i++) {
            if (topic.tallies[i] > winnerNoOfVotes) {
                winner = i;
                winnerNoOfVotes = topic.tallies[i];
            }
        }

        return winner;
    }

    function distributeReputation(uint topic_id) public returns(bool) {
        uint winner = getWinningOption(topic_id);
        Topic storage topic = topics[topic_id];
        for(uint i = 0; i < topic.voters.length; i++) {
            address currentVoter = topic.voters[i];
            uint currentVote = topic.votes[currentVoter];
            if(currentVote == winner) {
                RVotes(RVotesAddr).awardReputation(currentVoter);
            }
        }
        return true;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return RVotes(RVotesAddr).balanceOf(owner);
    }
}



