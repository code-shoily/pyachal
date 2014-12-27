if (Rooms.find().count() == 0) {
    Rooms.insert({name: "Welcome", is_system: true});
    Rooms.insert({name: "Meteorites", is_system: false});
    Rooms.insert({name: "AngularJS", is_system: false});
    Rooms.insert({name: "Pythonistas", is_system: false});
    Rooms.insert({name: "Clojurians", is_system: false});
}