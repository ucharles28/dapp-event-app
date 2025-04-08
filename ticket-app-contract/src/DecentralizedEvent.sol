// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {console} from "forge-std/console.sol";

/**
 * @title DecentralizedEvent
 * @author Ike Uzoma
 * @notice This contract is a decentralized event management system that allows users to create and manage events.
 */
contract DecentralizedEvent is ERC721URIStorage, Ownable, ReentrancyGuard {
    ///////////////////////////
    /////// Errors      ///////
    ///////////////////////////
    error DecentralizedEvent__TicketsShouldbeGreaterThanZero();
    error DecentralizedEvent__EventNameCannotBeEmpty();
    error DecentralizedEvent__EventArtCannotBeEmpty();
    error DecentralizedEvent__EventDescriptionCannotBeEmpty();
    error DecentralizedEvent__EventDateIsInvalid();
    error DecentralizedEvent__TicketPriceGreaterThanZero();
    error DecentralizedEvent__EventLocationIsRequired();
    error DecentralizedEvent__EventDoesNotExist();
    error DecentralizedEvent__SenderIsNotOrganizer();
    error DecentralizedEvent__SenderIsNotTicketOwner();
    error DecentralizedEvent__EventCancelled();
    error DecentralizedEvent__EventHasEnded();
    error DecentralizedEvent__AmountLessThanTicketPrice();
    error DecentralizedEvent__EventIsSoldOut();
    error DecentralizedEvent__TicketAlreadyUsed();
    error DecentralizedEvent__TicketUnavailableForSale();
    error DecentralizedEvent__TransferFailed();
    error DecentralizedEvent__EventThumbnailCannotBeEmpty();

    ////////////////////////////////////
    /////// Type Declarations    ///////
    ////////////////////////////////////
    struct Event {
        uint256 id; //@notice the event id
        string name; //@notice name of the event
        string description; //@notice description of the event
        string location; //@notice location of the event
        string eventArt; //@notice art of the event
        string thumbnail; //@notice thumbnail of the event
        uint256 eventDate; //@notice date of the event
        uint256 ticketPrice; //@notice price of the ticket
        uint256 totalTickets; //@notice total number of tickets available for the event
        uint256 ticketsSold; //@notice total number of tickets sold for the event
        address payable organizer; //@notice address of the organizer of the event
        // bool hasEnded; //@notice flag to indicate if the event has ended
        bool isCancelled; //@notice flag to indicate if the event has been cancelled
    }

    struct EventUpdate {
        string name;
        string description;
        string location;
        string eventArt;
        string thumbnail;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 eventDate;
        bool isCancelled;
    }

    struct Ticket {
        uint256 eventId; //@notice the event id
        address owner; //@notice the owner of the ticket
        bool isUsed; //@notice flag to indicate if the ticket has been used
        bool isForSale; //@notice flag to indicate if the ticket is for sale
        uint256 price; //@notice the price of the ticket
        // string barcodeUri; //@notice the barcode uri of the ticket
        // bool isResell; //@notice flag to indicate if the ticket is for resale
    }

    ////////////////////////////////////
    /////// State Variables     ///////
    ///////////////////////////////////
    mapping(uint256 => Event) private s_events; //@notice mapping of events
    mapping(uint256 => Ticket) private s_tickets; //@notice mapping of tickets
    mapping(uint256 => address) public s_ticketToEventOrganizer; //@notice mapping of tickets to event organizers
    mapping(address => uint256[]) private s_organizerToEventIds; //@notice mapping of event organizers to event ids
    uint256 private s_totalEvents;
    uint256 private s_totalTickets;
    address payable private immutable i_owner;

    ////////////////////////////////////
    /////// Events               ///////
    ///////////////////////////////////
    event EventCreated(
        uint256 indexed eventId,
        address indexed organizer,
        string indexed name
    );
    event EventModified(
        uint256 indexed eventId,
        address indexed organizer,
        string indexed name
    );
    event TicketMinted(
        uint256 indexed ticketId,
        address indexed owner,
        string indexed tokenUri
    );
    event TicketUsed(uint256 indexed ticketId, address indexed owner);
    event TicketListedForResale(
        uint256 indexed ticketId,
        address indexed owner,
        uint256 price,
        uint256 eventId
    );
    event TicketTransferred(
        uint256 indexed ticketId,
        address indexed from,
        address indexed to
    );

    ////////////////////////////////////
    /////// Modifiers            ///////
    ///////////////////////////////////
    modifier validateEventFields(
        string memory _name,
        string memory _description,
        string memory _location,
        string memory _eventArt,
        string memory _thumbnail,
        uint256 _ticketPrice,
        uint256 _totalTickets,
        uint256 _eventDate
    ) {
        if (_totalTickets == 0) {
            revert DecentralizedEvent__TicketsShouldbeGreaterThanZero();
        }
        if (_eventDate == 0) {
            revert DecentralizedEvent__EventDateIsInvalid();
        }
        if (_ticketPrice == 0) {
            revert DecentralizedEvent__TicketPriceGreaterThanZero();
        }
        if (bytes(_name).length == 0) {
            revert DecentralizedEvent__EventNameCannotBeEmpty();
        }
        if (bytes(_thumbnail).length == 0) {
            revert DecentralizedEvent__EventThumbnailCannotBeEmpty();
        }
        if (bytes(_eventArt).length == 0) {
            revert DecentralizedEvent__EventArtCannotBeEmpty();
        }
        if (bytes(_description).length == 0) {
            revert DecentralizedEvent__EventDescriptionCannotBeEmpty();
        }
        if (bytes(_location).length == 0) {
            revert DecentralizedEvent__EventLocationIsRequired();
        }

        _;
    }

    modifier checkEventExists(uint256 _eventId) {
        if (_eventId == 0 || _eventId > s_totalEvents) {
            revert DecentralizedEvent__EventDoesNotExist();
        }
        _;
    }

    constructor() Ownable(msg.sender) ERC721("Ticket", "TICKET") {
        i_owner = payable(msg.sender);
    }

    function createEvent(
        string memory _name,
        string memory _description,
        string memory _location,
        string memory _eventArt,
        string memory _thumbnail,
        uint256 _ticketPrice,
        uint256 _totalTickets,
        uint256 _eventDate
    )
        external
        payable
        nonReentrant
        validateEventFields(
            _name,
            _description,
            _location,
            _eventArt,
            _thumbnail,
            _ticketPrice,
            _totalTickets,
            _eventDate
        )
        returns (uint256)
    {
        // Effects
        s_totalEvents += 1;

        s_events[s_totalEvents] = Event({
            description: _description,
            id: s_totalEvents,
            name: _name,
            location: _location,
            eventDate: _eventDate,
            ticketPrice: _ticketPrice,
            totalTickets: _totalTickets,
            ticketsSold: 0,
            organizer: payable(msg.sender),
            isCancelled: false,
            eventArt: _eventArt,
            thumbnail: _thumbnail
        });

        s_organizerToEventIds[msg.sender].push(s_totalEvents);

        // Interactions
        emit EventCreated(s_totalEvents, msg.sender, _name);

        return s_totalEvents;
    }

    function editEvent(
        uint256 _eventId,
        EventUpdate calldata update
    )
        external
        payable
        nonReentrant
        checkEventExists(_eventId)
        validateEventFields(
            update.name,
            update.description,
            update.location,
            update.eventArt,
            update.thumbnail,
            update.ticketPrice,
            update.totalTickets,
            update.eventDate
        )
    {
        Event storage currentEvent = s_events[_eventId];
        if (currentEvent.organizer != msg.sender) {
            revert DecentralizedEvent__SenderIsNotOrganizer();
        }

        // Effects
        currentEvent.name = update.name;
        currentEvent.description = update.description;
        currentEvent.location = update.location;
        currentEvent.eventDate = update.eventDate;
        currentEvent.ticketPrice = update.ticketPrice;
        currentEvent.totalTickets = update.totalTickets;
        currentEvent.isCancelled = update.isCancelled;
        currentEvent.thumbnail = update.thumbnail;

        emit EventModified(_eventId, msg.sender, update.name);
    }

    function listForResale(uint256 _ticketId, uint256 _resalePrice) external {
        if (ownerOf(_ticketId) != msg.sender) {
            revert DecentralizedEvent__SenderIsNotTicketOwner();
        }
        if (s_tickets[_ticketId].isUsed) {
            revert DecentralizedEvent__TicketAlreadyUsed();
        }

        // require(resalePrice <= tickets[ticketId].price * 2, "Resale price too high");

        s_tickets[_ticketId].isForSale = true;
        s_tickets[_ticketId].price = _resalePrice;
        emit TicketListedForResale(
            _ticketId,
            msg.sender,
            _resalePrice,
            s_tickets[_ticketId].eventId
        );
    }

    function cancelEvent(uint256 _eventId) external checkEventExists(_eventId) {
        if (s_events[_eventId].organizer != msg.sender) {
            revert DecentralizedEvent__SenderIsNotOrganizer();
        }
        s_events[_eventId].isCancelled = true;
    }

    function buyTicket(
        uint256 _eventId,
        string calldata _tokenUri
    ) external payable nonReentrant checkEventExists(_eventId) {
        // Checks
        if (s_events[_eventId].isCancelled) {
            revert DecentralizedEvent__EventCancelled();
        }
        if (_hasEventEnded(_eventId)) {
            revert DecentralizedEvent__EventHasEnded();
        }
        if (msg.value < s_events[_eventId].ticketPrice) {
            revert DecentralizedEvent__AmountLessThanTicketPrice();
        }
        if (s_events[_eventId].ticketsSold >= s_events[_eventId].totalTickets) {
            revert DecentralizedEvent__EventIsSoldOut();
        }

        // Effects
        s_totalTickets += 1;
        s_tickets[s_totalTickets] = Ticket({
            eventId: _eventId,
            owner: msg.sender,
            isUsed: false,
            isForSale: false,
            price: s_events[_eventId].ticketPrice
        });

        s_events[_eventId].ticketsSold += 1;
        s_ticketToEventOrganizer[s_totalTickets] = s_events[_eventId].organizer;

        _mintTicket(msg.sender, _tokenUri);
        address organizer = s_events[_eventId].organizer;
        uint256 loyaltyFee = (msg.value * 5) / 100;
        uint256 organizerFee = msg.value - loyaltyFee;

        console.log(
            "Organizer fee: %s, Loyalty fee: %s",
            organizerFee,
            loyaltyFee
        );
        bool success = false;
        (success, ) = organizer.call{value: organizerFee}("");
        console.log("Success: %s", success);
        if (!success) {
            revert DecentralizedEvent__TransferFailed();
        }

        (success, ) = i_owner.call{value: loyaltyFee}("");
        if (!success) {
            revert DecentralizedEvent__TransferFailed();
        }
    }

    function buyTicket(
        uint256 _ticketId,
        uint256 _eventId,
        string calldata _tokenUri
    ) external payable {
        // Checks
        if (s_events[_eventId].isCancelled) {
            revert DecentralizedEvent__EventCancelled();
        }
        if (!s_tickets[_ticketId].isForSale) {
            revert DecentralizedEvent__TicketUnavailableForSale();
        }
        if (_hasEventEnded(s_tickets[_ticketId].eventId)) {
            revert DecentralizedEvent__EventHasEnded();
        }
        if (msg.value < s_events[_eventId].ticketPrice) {
            revert DecentralizedEvent__AmountLessThanTicketPrice();
        }

        // Effects
        address seller = s_tickets[_ticketId].owner;
        s_tickets[_ticketId].owner = msg.sender;
        s_tickets[_ticketId].isForSale = false;

        //Interactions
        _transferTicket(seller, msg.sender, _ticketId, _tokenUri);

        uint256 loyaltyFee = (msg.value * 5) / 100;
        uint256 sellerFee = msg.value - loyaltyFee;

        bool success = false;
        (success, ) = payable(seller).call{value: sellerFee}("");
        if (!success) {
            revert DecentralizedEvent__TransferFailed();
        }

        (success, ) = i_owner.call{value: loyaltyFee}("");
        if (!success) {
            revert DecentralizedEvent__TransferFailed();
        }
    }

    function _mintTicket(address _to, string memory _tokenUri) public {
        _mint(_to, s_totalTickets);
        _setTokenURI(s_totalTickets, _tokenUri);
        emit TicketMinted(s_totalTickets, _to, _tokenUri);
    }

    function _transferTicket(
        address _from,
        address _to,
        uint256 _ticketId,
        string calldata _tokenUri
    ) private {
        _setTokenURI(_ticketId, _tokenUri);
        _transfer(_from, _to, _ticketId);
        emit TicketTransferred(_ticketId, _from, _to);
    }

    function markTicketAsUsed(uint256 _ticketId) external {
        // Checks
        if (s_ticketToEventOrganizer[_ticketId] != msg.sender) {
            revert DecentralizedEvent__SenderIsNotOrganizer();
        }
        if (s_tickets[_ticketId].isUsed) {
            revert DecentralizedEvent__TicketAlreadyUsed();
        }

        // Effects
        s_tickets[_ticketId].isUsed = true;

        // Interactions
        emit TicketUsed(_ticketId, ownerOf(_ticketId));
    }

    function getEvent(
        uint256 _eventId
    ) external view checkEventExists(_eventId) returns (Event memory) {
        return s_events[_eventId];
    }

    function getTicket(
        uint256 _ticketId
    ) external view returns (Ticket memory) {
        return s_tickets[_ticketId];
    }

    function getEvents() external view returns (Event[] memory) {
        uint256 activeEvents = 0;
        for (uint256 i = 1; i <= s_totalEvents; i++) {
            if (!_hasEventEnded(i) && !s_events[i].isCancelled) {
                activeEvents++;
            }
        }

        uint256 index = 0;
        Event[] memory events = new Event[](activeEvents);
        for (uint256 i = 1; i <= s_totalEvents; i++) {
            if (!_hasEventEnded(i) && !s_events[i].isCancelled) {
                events[index] = s_events[i];
            }
        }

        return events;
    }

    function getEventsByOrganizer(
        address organizer
    ) external view returns (Event[] memory) {
        uint256[] memory ids = s_organizerToEventIds[organizer];
        Event[] memory events = new Event[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            events[i] = s_events[ids[i]];
        }

        return events;
    }

    function _hasEventEnded(
        uint256 _eventId
    ) private view checkEventExists(_eventId) returns (bool) {
        return block.timestamp > s_events[_eventId].eventDate;
    }
}
