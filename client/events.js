/**
 * Created by mafinar on 12/27/14.
 */
var joinRoom = function() {
    Session.set("currentRoom", this.name);
    Session.set("roomID", this._id);

    RoomMembers.find({member: Meteor.user()}).forEach(function(doc) {
        RoomMembers.remove({_id: doc._id});
    });

    RoomMembers.insert({
        room: Rooms.findOne({_id: this._id}),
        member: Meteor.user()
    });
}

Template.main.events = {
    "click #logout": function(event) {
        Session.set("handle", false);

        RoomMembers.find({member: Meteor.user()}).forEach(function(document) {
            RoomMembers.remove({_id: document._id});
        });

        Meteor.logout();
    },
    "keypress input#message-input": function(event) {
        var message = $("#message-input").val();

        if (event.which == 13) {
            Messages.insert({
                room: Session.get("currentRoom"),
                member: Meteor.user(),
                message: message,
                timestamp: new Date()
            });

            $("#message-input").val("");
        }
    }
};

Template.myRoom.events = {
    "click .join": joinRoom,
    "click .delete-room": function() {
        var decision = confirm("Are you sure you want to delete #" + this.name + "?");

        if (decision) {
            Rooms.remove({_id: this._id});
        }
    }
}
Template.generalRoom.events = {"click .join": joinRoom}
Template.systemRoom.events = {"click .join": joinRoom}
Template.roomInput.events = {
    "keydown input#add-room-input": function(event) {
        if (event.which == 13) {
            var roomToAdd = $("#add-room-input").val();

            if (Rooms.find({name: roomToAdd}).count() > 0) {
                alert("Room with this name already exists!");
            } else if (Rooms.find({}).count() > Config["room_limit"]) {
                alert("Room limit exceded!");
            } else {
                Rooms.insert({name: roomToAdd, is_system: false, createdBy: Meteor.user()});
            }

            $("#add-room-input").val("");
        }
    }
}