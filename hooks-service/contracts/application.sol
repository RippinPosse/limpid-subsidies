// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// Status of some process 
enum Status {
        Pending,
        Accepted,
        Declined
}

struct Document {
        uint id;
        string name;
        Status status;
}

struct ApplicationInput {
        string subsidy;
        Document[] documents;
}

contract Application {
    event Update (
        Document[] _documents,
        string _comment,
        Status _status
    );

    address applicant;
    Status currentStatus;

    mapping(uint => Document) public documents;
    Document[] documentsList;

    constructor(ApplicationInput  memory input) {
            applicant = msg.sender;

            for (uint i = 0; i < input.documents.length; i++) {
                    Document memory doc = input.documents[i];
                    documents[doc.id] = doc;
            }

            emit Update(input.documents, msgAddApplication, Status.Pending);

            currentStatus = Status.Pending;
    }

        
}

string constant msgAddApplication = "application pushed to network";