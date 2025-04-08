export const contractAddress = '0xbD15B2b850561dDD6c7e6df46d0bf43297Af274c';
export const abi = [
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "_mintTicket",
        "inputs": [
            {
                "name": "_to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_tokenUri",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "buyTicket",
        "inputs": [
            {
                "name": "_ticketId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_eventId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_tokenUri",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "buyTicket",
        "inputs": [
            {
                "name": "_eventId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_tokenUri",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "cancelEvent",
        "inputs": [
            {
                "name": "_eventId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createEvent",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_location",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_eventArt",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_thumbnail",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_ticketPrice",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_totalTickets",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_eventDate",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "editEvent",
        "inputs": [
            {
                "name": "_eventId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "update",
                "type": "tuple",
                "internalType": "struct DecentralizedEvent.EventUpdate",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "location",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "eventArt",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "thumbnail",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "ticketPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalTickets",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "eventDate",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "isCancelled",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getApproved",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEvent",
        "inputs": [
            {
                "name": "_eventId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct DecentralizedEvent.Event",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "location",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "eventArt",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "thumbnail",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "eventDate",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ticketPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalTickets",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ticketsSold",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "organizer",
                        "type": "address",
                        "internalType": "address payable"
                    },
                    {
                        "name": "isCancelled",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEvents",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct DecentralizedEvent.Event[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "location",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "eventArt",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "thumbnail",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "eventDate",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ticketPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalTickets",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ticketsSold",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "organizer",
                        "type": "address",
                        "internalType": "address payable"
                    },
                    {
                        "name": "isCancelled",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEventsByOrganizer",
        "inputs": [
            {
                "name": "organizer",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct DecentralizedEvent.Event[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "location",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "eventArt",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "thumbnail",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "eventDate",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ticketPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalTickets",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ticketsSold",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "organizer",
                        "type": "address",
                        "internalType": "address payable"
                    },
                    {
                        "name": "isCancelled",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTicket",
        "inputs": [
            {
                "name": "_ticketId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct DecentralizedEvent.Ticket",
                "components": [
                    {
                        "name": "eventId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "isUsed",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "isForSale",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "price",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "listForResale",
        "inputs": [
            {
                "name": "_ticketId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_resalePrice",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "markTicketAsUsed",
        "inputs": [
            {
                "name": "_ticketId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "s_ticketToEventOrganizer",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "BatchMetadataUpdate",
        "inputs": [
            {
                "name": "_fromTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "_toTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EventCreated",
        "inputs": [
            {
                "name": "eventId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "organizer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": true,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EventModified",
        "inputs": [
            {
                "name": "eventId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "organizer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": true,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MetadataUpdate",
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TicketListedForResale",
        "inputs": [
            {
                "name": "ticketId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "price",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "eventId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TicketMinted",
        "inputs": [
            {
                "name": "ticketId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenUri",
                "type": "string",
                "indexed": true,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TicketTransferred",
        "inputs": [
            {
                "name": "ticketId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TicketUsed",
        "inputs": [
            {
                "name": "ticketId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__AmountLessThanTicketPrice",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventArtCannotBeEmpty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventCancelled",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventDateIsInvalid",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventDescriptionCannotBeEmpty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventDoesNotExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventHasEnded",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventIsSoldOut",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventLocationIsRequired",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventNameCannotBeEmpty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__EventThumbnailCannotBeEmpty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__SenderIsNotOrganizer",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__SenderIsNotTicketOwner",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__TicketAlreadyUsed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__TicketPriceGreaterThanZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__TicketUnavailableForSale",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__TicketsShouldbeGreaterThanZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DecentralizedEvent__TransferFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ERC721IncorrectOwner",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InsufficientApproval",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidApprover",
        "inputs": [
            {
                "name": "approver",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOperator",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidReceiver",
        "inputs": [
            {
                "name": "receiver",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidSender",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721NonexistentToken",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ReentrancyGuardReentrantCall",
        "inputs": []
    }
] as const