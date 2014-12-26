Template.main.helpers({
    roomList: function() {
        return Rooms.find({});
    },
    currentRoom: function() {
        return Session.get("currentRoom") || "Welcome";
    },
    memberList: function() {
        var currentRoom = Session.get("currentRoom") || "Welcome";

        return RoomMembers.find({"room.name": (Session.get("currentRoom") || "Welcome")});
    },
    handle: function() {
        return Session.get("handle");
    }
});

Template.main.events = {
    "keydown input#handle": function(event) {
        if (event.which == 13) {
            var handle = $("#handle").val();

            if (Users.find({handle: handle}).count() > 0) {
                alert("Handle already taken, please use another one");
            } else {
                Users.insert({handle: handle}, function(err, _id) {
                    Session.set("handle", handle);
                    Session.set("uid", _id);

                    RoomMembers.insert({room: Rooms.findOne({name: "Welcome"}),
                                        member: Users.findOne({_id: _id})});
                });
            }

        }
    },
    "click #logout": function(event) {
        Session.set("handle", false);

        RoomMembers.find({"member._id": Session.get("uid")}).forEach(function(document) {
            console.log(document);
            RoomMembers.remove({_id: document._id});
        });

        Users.remove({_id: Session.get("uid")})
    }
};

Template.room.events = {
    "click .join": function() {
        Session.set("currentRoom", this.name);
        Session.set("roomID", this._id);

        RoomMembers.find({"member._id": Session.get("uid")}).forEach(function(document) {
            console.log(document);
            RoomMembers.remove({_id: document._id});
        });

        RoomMembers.insert({room: Rooms.findOne({_id: this._id}),
                            member: Users.findOne({_id: Session.get("uid")})
        });
    },
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

Template.roomInput.events = {
    "keydown input#add-room-input": function(event) {
        if (event.which == 13) {
            var roomToAdd = $("#add-room-input").val();

            if (Rooms.find({name: roomToAdd}) > 0) {
                alert("Room with this name already exists!");
            } else if (Rooms.find({}).count() > Config["room_limit"]) {
                alert("Room limit exceded!");
            } else {
                Rooms.insert({name: roomToAdd, is_system: false, members: []});
            }

            $("#add-room-input").val("");
        }
    }
}