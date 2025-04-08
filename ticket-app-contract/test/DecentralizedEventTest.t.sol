// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {DecentralizedEvent} from "../src/DecentralizedEvent.sol";

contract DecentralizedEventTest is Test {
    DecentralizedEvent public eventContract;

    address organizer = makeAddr('organizer');
    address attacker = makeAddr('attacker');
    address ticketHolder = makeAddr('ticketHolder');
    address owner = makeAddr('owner');
    uint256 eventId = 1;
    uint256 ticketId = 1;

    function setUp() public {
        vm.prank(owner);
        eventContract = new DecentralizedEvent();
        vm.deal(ticketHolder, 2 ether);
    }

    ////////////////////////////////////
    /////// Create event         ///////
    ///////////////////////////////////
    function testRevertWhenTotalTicketsIsZero() public {
        vm.expectRevert(
            DecentralizedEvent
                .DecentralizedEvent__TicketsShouldbeGreaterThanZero
                .selector
        );
        eventContract.createEvent(
            "My Event",
            "Cool event description",
            "Berlin",
            "ipfs://event-art",
            "ipfs://thumbnail",
            1 ether,
            0,
            block.timestamp + 1 days
        );
    }

    function testRevertWhenEventDateIsZero() public {
        vm.expectRevert(
            DecentralizedEvent.DecentralizedEvent__EventDateIsInvalid.selector
        );
        eventContract.createEvent(
            "My Event",
            "Cool event description",
            "Berlin",
            "ipfs://event-art",
            "ipfs://thumbnail",
            1 ether,
            100,
            0
        );
    }

    function testRevertWhenTicketPriceIsZero() public {
        vm.expectRevert(
            DecentralizedEvent
                .DecentralizedEvent__TicketPriceGreaterThanZero
                .selector
        );
        eventContract.createEvent(
            "My Event",
            "Cool event description",
            "Berlin",
            "ipfs://event-art",
            "ipfs://thumbnail",
            0,
            100,
            block.timestamp + 1 days
        );
    }

    function testRevertWhenNameIsEmpty() public {
        vm.expectRevert(
            DecentralizedEvent
                .DecentralizedEvent__EventNameCannotBeEmpty
                .selector
        );
        eventContract.createEvent(
            "",
            "Cool event description",
            "Berlin",
            "ipfs://event-art",
            "ipfs://thumbnail",
            1 ether,
            100,
            block.timestamp + 1 days
        );
    }

    function testRevertWhenDescriptionIsEmpty() public {
        vm.expectRevert(
            DecentralizedEvent
                .DecentralizedEvent__EventDescriptionCannotBeEmpty
                .selector
        );
        eventContract.createEvent(
            "My Event",
            "",
            "Berlin",
            "ipfs://event-art",
            "ipfs://thumbnail",
            1 ether,
            100,
            block.timestamp + 1 days
        );
    }

    function testRevertWhenLocationIsEmpty() public {
        vm.expectRevert(
            DecentralizedEvent
                .DecentralizedEvent__EventLocationIsRequired
                .selector
        );
        eventContract.createEvent(
            "My Event",
            "Cool event description",
            "",
            "ipfs://event-art",
            "ipfs://thumbnail",
            1 ether,
            100,
            block.timestamp + 1 days
        );
    }

    function testRevertWhenEventArtIsEmpty() public {
        vm.expectRevert(
            DecentralizedEvent
                .DecentralizedEvent__EventArtCannotBeEmpty
                .selector
        );
        eventContract.createEvent(
            "My Event",
            "Cool event description",
            "Berlin",
            "",
            "ipfs://thumbnail",
            1 ether,
            100,
            block.timestamp + 1 days
        );
    }

    function testRevertWhenThumbnailIsEmpty() public {
        vm.expectRevert(
            DecentralizedEvent
                .DecentralizedEvent__EventThumbnailCannotBeEmpty
                .selector
        );
        eventContract.createEvent(
            "My Event",
            "Cool event description",
            "Berlin",
            "ipfs://event-art",
            "",
            1 ether,
            100,
            block.timestamp + 1 days
        );
    }

    function testCreateEventSuccess() public {
        uint256 temp_eventId = eventContract.createEvent(
            "My Event",
            "Cool event description",
            "Berlin",
            "ipfs://event-art",
            "ipfs://thumbnail",
            1 ether,
            100,
            block.timestamp + 1 days
        );

        assertEq(temp_eventId, 1);
        DecentralizedEvent.Event memory tempEvent = eventContract.getEvent(
            temp_eventId
        );
        assertEq(tempEvent.name, "My Event");
    }

    ////////////////////////////////////
    /////// Edit Event          ///////
    ///////////////////////////////////

    modifier createEvent {
        vm.prank(organizer);
        eventContract.createEvent(
            "Original Event",
            "Initial description",
            "NYC",
            "ipfs://image",
            "ipfs://thumbnail",
            1 ether,
            100,
            block.timestamp + 1 days
        );
        _;
    }

    function testRevertWhenEventIdIsZero() public createEvent {
        DecentralizedEvent.EventUpdate memory update = getValidUpdate();

        vm.prank(organizer);
        vm.expectRevert(
            DecentralizedEvent.DecentralizedEvent__EventDoesNotExist.selector
        );
        eventContract.editEvent(0, update);
    }

    function testRevertWhenEventIdIsOutOfRange() public createEvent {
        DecentralizedEvent.EventUpdate memory update = getValidUpdate();

        vm.prank(organizer);
        vm.expectRevert(
            DecentralizedEvent.DecentralizedEvent__EventDoesNotExist.selector
        );
        eventContract.editEvent(999, update);
    }

    function testRevertWhenSenderIsNotOrganizer() public createEvent {
        DecentralizedEvent.EventUpdate memory update = getValidUpdate();

        vm.prank(attacker);
        vm.expectRevert(
            DecentralizedEvent.DecentralizedEvent__SenderIsNotOrganizer.selector
        );
        eventContract.editEvent(1, update);
    }

    function testEditEventSuccessfully() public createEvent {
        DecentralizedEvent.EventUpdate memory update = getValidUpdate();

        vm.prank(organizer);
        vm.expectEmit(true, true, false, true);
        emit DecentralizedEvent.EventModified(1, organizer, update.name);

        eventContract.editEvent(1, update);

        DecentralizedEvent.Event memory modifiedEvent = eventContract.getEvent(1);

        assertEq(modifiedEvent.name, update.name);
        assertEq(modifiedEvent.description, update.description);
        assertEq(modifiedEvent.location, update.location);
        assertEq(modifiedEvent.eventDate, update.eventDate);
        assertEq(modifiedEvent.ticketPrice, update.ticketPrice);
        assertEq(modifiedEvent.totalTickets, update.totalTickets);
        assertEq(modifiedEvent.isCancelled, update.isCancelled);
    }

    function getValidUpdate() internal view returns (DecentralizedEvent.EventUpdate memory) {
        return
            DecentralizedEvent.EventUpdate({
                name: "Updated Event",
                description: "Updated description",
                location: "Paris",
                eventArt: "ipfs://new-art",
                thumbnail: "ipfs://new-thumbnail",
                ticketPrice: 2 ether,
                totalTickets: 200,
                eventDate: block.timestamp + 2 days,
                isCancelled: true
            });
    }



    ////////////////////////////////////////
    /////// List ticket for resell  ///////
    //////////////////////////////////////
    modifier buyTicket {
        vm.prank(ticketHolder);
        eventContract.buyTicket{value: 1 ether}(1, "j");
        _;
    }

    function testRevertIfNotTicketOwner() public createEvent buyTicket {
        vm.prank(attacker);
        vm.expectRevert(DecentralizedEvent.DecentralizedEvent__SenderIsNotTicketOwner.selector);
        eventContract.listForResale(1, 2 ether);
    }

    function testRevertIfTicketAlreadyUsed() public createEvent buyTicket {
        // Mark ticket as used manually for test (assumes s_tickets is public or internal with helper)
        vm.prank(organizer);
        eventContract.markTicketAsUsed(1); // You should have this function or similar

        vm.prank(ticketHolder);
        vm.expectRevert(DecentralizedEvent.DecentralizedEvent__TicketAlreadyUsed.selector);
        eventContract.listForResale(1, 2 ether);
    }

    function testListTicketForResaleSuccessfully() public createEvent buyTicket {
        uint256 resalePrice = 2 ether;

        vm.prank(ticketHolder);
        vm.expectEmit(true, true, true, true);
        emit DecentralizedEvent.TicketListedForResale(1, ticketHolder, resalePrice, 1);

        eventContract.listForResale(1, resalePrice);

        DecentralizedEvent.Ticket memory ticket = eventContract.getTicket(1);

        assertEq(ticket.price, resalePrice);
        assertEq(ticket.isUsed, false);
        assertTrue(ticket.isForSale);
    }

    ////////////////////////////////////////
    /////// Cancel event             ///////
    //////////////////////////////////////

    function testCancelEventSuccessfully() public createEvent {
        // Organizer cancels the event
        vm.prank(organizer);
        eventContract.cancelEvent(eventId);

        DecentralizedEvent.Event memory theEvent = eventContract.getEvent(eventId);
        assertTrue(theEvent.isCancelled);
    }

    function testRevertIfNotOrganizer() public createEvent {
        vm.prank(attacker);
        vm.expectRevert(DecentralizedEvent.DecentralizedEvent__SenderIsNotOrganizer.selector);
        eventContract.cancelEvent(eventId);
    }

    function testRevertIfEventDoesNotExist() public {
        uint256 invalidEventId = 999;
        vm.prank(organizer);
        vm.expectRevert(DecentralizedEvent.DecentralizedEvent__EventDoesNotExist.selector);
        eventContract.cancelEvent(invalidEventId);
    }


     function testGetEventsReturnsActiveEventsOnly() public {
        vm.startPrank(organizer);

        // Event 1: Active (future date)
        eventContract.createEvent(
            "Active Event",
            "Cool event",
            "NYC",
            "art",
            "thumb",
            1 ether,
            100,
            block.timestamp + 5 days
        );

        // Event 2: Cancelled
        eventContract.createEvent(
            "Cancelled Event",
            "Nope",
            "LA",
            "art",
            "thumb",
            1 ether,
            100,
            block.timestamp + 1 days
        );
        eventContract.cancelEvent(2);

        // Event 3: Ended
        eventContract.createEvent(
            "Past Event",
            "Old stuff",
            "Berlin",
            "art",
            "thumb",
            1 ether,
            100,
            block.timestamp + 1 days
        );

        // Fast forward past Event 3
        vm.warp(block.timestamp + 2 days);

        vm.stopPrank();

        // Check
        DecentralizedEvent.Event[] memory events = eventContract.getEvents();
        assertEq(events.length, 1);
        assertEq(events[0].name, "Active Event");
        assertEq(events[0].location, "NYC");
    }
}
