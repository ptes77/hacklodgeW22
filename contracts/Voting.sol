// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

interface IRVotes {
    function awardReputation(address to) external;

    function isOwner(address owner) external view returns (bool);

    function balanceOf(address owner) external view returns (uint256);
}

contract Voting {
    enum State {
        Running,
        Completed,
        Canceled
    }
    struct Topic {
        string prompt;
        uint256 numOptions;
        address proposer;
        State state;
        uint256 endBlock;
        address[] voters;
        mapping(address => uint256) votes;
        mapping(uint256 => uint256) tallies;
        bool distributed;
        string ipfsHash;
    }

    mapping(uint256 => Topic) public topics;
    mapping(uint256 => string) public hashFromTopicNum;
    uint256 public nextTopicNumber;
    address public RVotesAddr;

    constructor() {
        nextTopicNumber = 0;
        RVotesAddr = 0x982a97ceF32DFcc83015eCA074fa8470D2e595E2; // deployed 3:35pm 1/14/22
        // This contract's address: 0x8D2e191Fc6F72fac49dC48e87e9CFC30b159967a
    }

    function setState(uint256 topic_id) public {
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

    function getState(uint256 topic_id) public view returns (string memory) {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        if (topic.state == State.Running) {
            return ("Running");
        } else if (topic.state == State.Completed) {
            return ("Completed");
        } else {
            return ("Canceled");
        }
    }

    function createTopic(
        string memory _prompt,
        uint256 _numOptions,
        uint256 _votingDuration
    ) public {
        // check address is member of DAO
        require(
            IRVotes(RVotesAddr).isOwner(msg.sender),
            "You are not a member of the DAO"
        );
        Topic storage topic = topics[nextTopicNumber];
        topic.prompt = _prompt;
        topic.numOptions = _numOptions;
        topic.proposer = msg.sender;
        topic.endBlock = block.number + _votingDuration / 15;
        topic.state = State.Running;
        topic.distributed = false;
        nextTopicNumber++;
    }

    function addIPFStoMapping(string memory ipfsHash, uint256 topicNumber)
        public
    {
        Topic storage topic = topics[topicNumber];
        topic.ipfsHash = ipfsHash;
        hashFromTopicNum[topicNumber] = ipfsHash;
    }

    function vote(uint256 topic_id, uint256 optionNo) public returns (bool) {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        setState(topic_id);
        // optionNo is 1-indexed!!
        require(
            optionNo > 0 && optionNo <= topic.numOptions,
            "Not a valid option"
        );
        require(topic.state == State.Running, "Vote must be currently running");
        // check address is member of DAO
        require(
            IRVotes(RVotesAddr).isOwner(msg.sender),
            "You are not a member of the DAO"
        );
        // make sure caller hasn't already voted
        require(topic.votes[msg.sender] == 0, "You have already voted");
        topic.votes[msg.sender] = optionNo;
        topic.voters.push(msg.sender);
        topic.tallies[optionNo] += balanceOf(msg.sender); // weighted voting

        return true;
    }

    function getWinningOption(uint256 topic_id) private returns (uint256) {
        require(topic_id < nextTopicNumber, "Invalid topic id passed in");
        Topic storage topic = topics[topic_id];
        setState(topic_id);
        require(topic.state == State.Completed, "Voting is not complete");
        uint256 winner = 0;
        uint256 winnerNoOfVotes = 0;
        for (uint256 i = 1; i <= topic.numOptions; i++) {
            if (topic.tallies[i] > winnerNoOfVotes) {
                winner = i;
                winnerNoOfVotes = topic.tallies[i];
            }
        }

        return winner;
    }

    function distributeReputation(uint256 topic_id) public returns (bool) {
        uint256 winner = getWinningOption(topic_id);
        Topic storage topic = topics[topic_id];
        require(!topic.distributed, "Vote funds have already been distributed");
        for (uint256 i = 0; i < topic.voters.length; i++) {
            address currentVoter = topic.voters[i];
            uint256 currentVote = topic.votes[currentVoter];
            if (currentVote == winner) {
                IRVotes(RVotesAddr).awardReputation(currentVoter);
            }
        }
        topic.distributed = true;
        return true;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return IRVotes(RVotesAddr).balanceOf(owner);
    }
}
