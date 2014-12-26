/**
 * Created by mafinar on 12/27/14.
 */
Config = {
    "room_limit": 5,
    "member_limit": 10
};

Users = new Meteor.Collection('users')
Rooms = new Meteor.Collection('rooms');
Messages = new Meteor.Collection('messages');
RoomMembers = new Meteor.Collection('room_members')
