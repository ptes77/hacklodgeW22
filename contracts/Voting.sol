// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Voting {
    enum State {BeforeStart, Running, Completed, Canceled}
    struct Topic {
        string prompt;
        string[] options;
        address proposer;
        State state;
        uint startline;
        uint deadline;
        address[] voters;
        mapping(address => string) votes;
        mapping(string => uint) tallies;
    }

    mapping(uint => Topic) public topics;
    uint public nextTopicNumber;

    constructor() {
        nextTopicNumber = 0;
    }

    function setState(uint topic_id) private {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        if (topic.state == State.Canceled) {
            return;
        }
        if(block.timestamp < topic.startline) {
            topic.state = State.BeforeStart;
        } else if (block.timestamp >= topic.startline && block.timestamp < topic.deadline) {
            topic.state = State.Running;
        } else {
            topic.state = State.Completed;
        }
    }

    function createTopic(string memory _prompt, string[] memory _options, uint _startline, uint _deadline) public {
        require(_startline < _deadline, "Deadline cannot be before voting period starts!");
        Topic storage topic = topics[nextTopicNumber];
        topic.prompt = _prompt;
        topic.options = _options;
        topic.proposer = msg.sender;
        topic.startline = _startline;
        topic.deadline = _deadline;
        setState(nextTopicNumber);
        nextTopicNumber++;
    }

    function vote(uint topic_id, string memory option) public returns (bool) {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        setState(topic_id);
        require(topic.state == State.Running, "Vote must be currently running");
        // also need to check address is member of DAO
        // make sure caller hasn't already voted
        require(keccak256(abi.encodePacked(topic.votes[msg.sender])) == keccak256(abi.encodePacked("")));
        topic.votes[msg.sender] = option;
        topic.voters.push(msg.sender);
        topic.tallies[option] += 1;

        return true;
    }

    function getWinningOption(uint topic_id) private returns(string memory) {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        setState(topic_id);
        require(topic.state == State.Completed, "Voting is not complete");
        string memory winner = "";
        uint winnerNoOfVotes = 0;
        for(uint i = 0; i < topic.options.length; i++) {
            string memory currentOption = topic.options[i];
            if (topic.tallies[currentOption] > winnerNoOfVotes) {
                winner = currentOption;
                winnerNoOfVotes = topic.tallies[currentOption];
            }
        }

        return winner;
    }

    function distributeReputation(uint topic_id) public returns(bool) {
        string memory winner = getWinningOption(topic_id);
        bytes32 hashedWinner = keccak256(abi.encodePacked(winner));
        Topic storage topic = topics[topic_id];
        for(uint i = 0; i < topic.voters.length; i++) {
            address currentVoter = topic.voters[i];
            bytes32 hashedVote = keccak256(abi.encodePacked(topic.votes[currentVoter]));
            if(hashedWinner == hashedVote) {
                // add reputation to currentVoter
            }
        }
        return true;
    }
}

