Template.main.helpers({
    roomList: function() {
        // Lists all the rooms added by other people
        return Rooms.find({is_system: false});
    },
    welcomeRoomList: function() {
        // System Room, common landing place
        return Rooms.find({is_system: true});
    },
    myRoomList: function() {
        // Rooms created by the logged in user
        return Rooms.find({createdBy: Meteor.user()});
    },
    currentRoom: function() {
        // The current Room name. Defaults to #Welcome
        return Session.get("currentRoom") || "Welcome";
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

Template.main.events = {
    "click #logout": function(event) {
        Session.set("handle", false);

        RoomMembers.find({member: Meteor.user()}).forEach(function(document) {
            RoomMembers.remove({_id: document._id});
        });

        Meteor.logout();
    }
};

