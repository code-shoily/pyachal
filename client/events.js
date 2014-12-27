/**
 * Created by mafinar on 12/27/14.
 */
var joinRoom = function() {
    Session.set("currentRoom", this.name);
    Session.set("roomID", this._id);

    RoomMembers.remove({member: Meteor.user()});
    RoomMembers.insert({
        room: Rooms.findOne({_id: this._id}),
        member: Meteor.user()
    });
}

Template.myRoom.events = {
    "click .join": joinRoom,
    "click .delete-room": function() {
        var decision = confirm("Are you sure you want to delete #"
        + this.name
        + "? You're lucky it's for DEMO purposes otherwise I wouldn't "
        + "have even let you add, let alone delete!");

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

            if (Rooms.find({name: roomToAdd}) > 0) {
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