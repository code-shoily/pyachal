if (Rooms.find().count() == 0) {
    Rooms.insert({name: "Welcome", is_system: true});
    Rooms.insert({name: "Meteorites", is_system: false});
    Rooms.insert({name: "JavaScripters", is_system: false});
    Rooms.insert({name: "Pythonistas", is_system: false});
    Rooms.insert({name: "C Veterans", is_system: false});
    Rooms.insert({name: "Java Gurus", is_system: false});
    Rooms.insert({name: "Old Lispers", is_system: false});
    Rooms.insert({name: "PHP Warriors", is_system: false});
    Rooms.insert({name: "WordPressians", is_system: false});
    Rooms.insert({name: "Adans?", is_system: false});
    Rooms.insert({name: "Ruby Hipsters", is_system: false});
}