Template.main.helpers({
    roomList: function() {
        // Lists all the rooms added by other people
        return Rooms.find({is_system: false, createdBy: {$not: Meteor.user()}}, {sort: {name: 1}});
    },
    messages: function() {
        return Messages.find({room: Session.get("currentRoom")});
    },
    welcomeRoomList: function() {
        // System Room, common landing place
        return Rooms.find({is_system: true}, {sort: {name: 1}});
    },
    myRoomList: function() {
        // Rooms created by the logged in user
        return Rooms.find({createdBy: Meteor.user()}, {sort: {name: 1}});
    },
    currentRoom: function() {
        // The current Room name. Defaults to #Welcome
        return Session.get("currentRoom") || "[please select a room]";
    },
    memberList: function() {
        // Finds all the members of the currently selected room
        var currentRoom = Session.get("currentRoom") || "Welcome";

        return RoomMembers.find({"room.name": (Session.get("currentRoom") || "Welcome")});
    },
    handle: function() {
        // Returns the 'Handle' of the current selected room
        return Meteor.user().emails[0]["address"];
    }
});
