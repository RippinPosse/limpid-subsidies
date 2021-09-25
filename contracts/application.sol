// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// Status of some process 
enum Status {
        Pending,
        Accepted,
        Declined
}

enum Participant {
        Applicant,
        Provider
}

struct Document {
        uint id;
        string name;
        Status status;
}

struct ApplicationInput {
        string subsidy;
        uint number;
        Document[] documents;
}

contract Application {
    event Update (
        Document[] _documents,
        string _comment,
        Status _status
    );

    address applicant;
    uint number;
    Status currentStatus;

    mapping(uint => Document) public documents;
    Document[] documentsList;

    constructor() {
        applicant = msg.sender;
    }

    function start(ApplicationInput memory input) public {
            number = input.number;

            for (uint i = 0; i < input.documents.length; i++) {
                    Document memory doc = input.documents[i];
                    doc.status = Status.Pending;
                    documents[doc.id] = doc;
                    documentsList.push(doc);
            }

            emit Update(documentsList, msgAddApplication, Status.Pending);

            currentStatus = Status.Pending;
    }
}

string constant msgAddApplication = "application pushed to network";