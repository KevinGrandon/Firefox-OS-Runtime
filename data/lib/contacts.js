(function() {
    // taken from the unit tests in the contact app in Gaia,
    // but removed photo's and made bday a Date object
    function MockContactsList() {
        return [{
            'id': '1',
            'updated': new Date(),
            'additionalName': [''],
            'adr': [{
                'countryName': 'Germany',
                'locality': 'Chemnitz',
                'postalCode': '09034',
                'streetAddress': 'Gotthardstrasse 22'
            }],
            'bday': new Date('1978-12-20'),
            'email': [{
                'type': 'Personal',
                'value': 'test@test.com'
            }],
            'familyName': ['AD'],
            'givenName': ['Pepito'],
            'jobTitle': [''],
            'name': ['Pepito A'],
            'org': ['Test'],
            'tel': [{
                'value': '+346578888881',
                'type': 'Mobile',
                'carrier': 'TEL'
            }],
            'category': [],
            'note': ['Note 1'],
            'photo': []
        }, {
            'id': '2',
            'updated': new Date(),
            'additionalName': [''],
            'adr': [{
                'countryName': 'Germany',
                'locality': 'Chemnitz',
                'postalCode': '09034',
                'streetAddress': 'Gotthardstrasse 22'
            }],
            'bday': new Date('1978-12-20'),
            'email': [{
                'type': 'Personal',
                'value': 'test@test.com'
            }],
            'familyName': ['BA'],
            'givenName': ['Pepito'],
            'jobTitle': [''],
            'name': ['Pepito BA'],
            'org': ['Test'],
            'tel': [{
                'value': '+346578888882',
                'type': 'Mobile',
                'carrier': 'TEL'
            }],
            'category': [],
            'note': ['Note 1'],
            'photo': []
        }, {
            'id': '3',
            'updated': new Date(),
            'additionalName': [''],
            'adr': [{
                'countryName': 'Germany',
                'locality': 'Chemnitz',
                'postalCode': '09034',
                'streetAddress': 'Gotthardstrasse 22'
            }],
            'bday': new Date('1978-12-20'),
            'email': [{
                'type': 'Personal',
                'value': 'test@test.com'
            }],
            'familyName': ['CC'],
            'givenName': ['Antonio'],
            'jobTitle': [''],
            'name': ['Antonio CC'],
            'org': ['Test'],
            'tel': [{
                'value': '+346578888883',
                'type': 'Mobile',
                'carrier': 'TEL'
            }],
            'category': [],
            'note': ['Note 1'],
            'photo': ['']
        }];
    }

    var MozContacts = function() {
        this.$contacts = MockContactsList();

        this.find = function(options) {
            var self = this;
            var proxy = {};

            var res = self.$contacts;
            if (options.filterOp === 'equals') {
                res = res.filter(function(c) {
                    return c[options.filterBy[0]] == options.filterValue;
                });
            }

            setTimeout(function() {
                proxy.result = res;
                proxy.onsuccess({target: { result: proxy.result }});
            });

            return proxy;
        };

        this.clear = function() {

        };

        this.save = function(contact) {
            var proxy = {};

            this.$contacts.push(contact);

            setTimeout(function() {
                proxy.onsuccess();
            });

            return proxy;
        };

        this.remove = function(contact) {
            var self = this;
            var iof = this.$contacts.indexOf(contact);
            var proxy = {};

            setTimeout(function() {
                if (iof === -1) {
                    proxy.onerror();
                }
                else {
                    self.$contacts.splice(iof, 1);
                    proxy.onsuccess();
                }
            });

            return proxy;
        };

        this.getSimContacts = function(type) {

        };
    };

    FFOS_RUNTIME.makeNavigatorShim('mozContacts', new MozContacts());
}());
