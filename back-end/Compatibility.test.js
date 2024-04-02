const chai = require('chai');
const compat = require("./Compatibility.js")

const expect = chai.expect;

const BarackObama = {
    login: {
        username: "BarackObama",
        password: "obamaSecure456"
    },

    profile: {
        name: "Barack Obama",
        year: "Freshman",
        bio: "Yes we can!"
    },

    answers: {
        //info
        gender: "male", //male, female, other
        year: "freshman", //freshman, sophomore, junoir, senior, other
        pets: "no", //yes, no
        //living style
        guests: "often", //often, sometimes, never
        smoke: "never",
        drink: "sometimes",
        //rent range
        rent_max: 4000,
        rent_min: 1000, 
        //living habits
        bedtime: 2, //1(before 10), 2(10pm-12am), 3(12am-2am), 4(2am-4am), 5(after 4am), 0(depends)
        quietness : 2, //rank out of 1-5
        cleanliness: 4 //rank out of 1-5
    },

    preferences: {
        //info
        gender: "same", //same, okay(with anything)
        year: "okay", //same, okay
        pets: "yes", //yes, no
        //living style
        guests: "yes", //yes, no
        smoke: "yes", //yes, no
        drink: "yes", //yes, no
        //living habits
        bedtime: "similar", //similar, okay
        quietness: "okay", //similar, okay
        cleanliness: "okay" //similar, okay
    }
};

const TaylorSwift = {
    login: {
        username: "TaylorSwift",
        password: "qwerasdf"
    },

    profile: {
        name: "Taylor Swift",
        year: "Junior",
        bio: "We're happy, free, confused and lonely at the same time!"
    },

    answers: {
        //info
        gender: "female", //male, female, other
        year: "junior", //freshman, sophomore, junoir, senior, other
        pets: "no", //yes, no
        //living style
        guests: "never", //often, sometimes, never
        smoke: "often",
        drink: "sometimes",
        //rent range
        rent_max: 4000,
        rent_min: 1000, 
        //living habits
        bedtime: 2, //1(before 10), 2(10pm-12am), 3(12am-2am), 4(2am-4am), 5(after 4am), 0(depends)
        quietness : 5, //rank out of 1-5
        cleanliness: 1 //rank out of 1-5
    },

    preferences: {
        //info
        gender: "same", //same, okay(with anything)
        year: "same", //same, okay
        pets: "yes", //yes, no
        //living style
        guests: "yes", //yes, no
        smoke: "no", //yes, no
        drink: "yes", //yes, no
        //living habits
        bedtime: "similar", //similar, okay
        quietness: "okay", //similar, okay
        cleanliness: "okay" //similar, okay
    }
}

const BobbyImpasto = {
    login: {
        username: "BobbyImpasto",
        password: "bobby123"
    },

    profile: {
        name: "Bobby Impasto",
        year: "Senior",
        bio: "Yolo!"
    },

    answers: {
        //info
        gender: "male", //male, female, other
        year: "senior", //freshman, sophomore, junoir, senior, other
        pets: "no", //yes, no
        //living style
        guests: "never", //often, sometimes, never
        smoke: "sometimes",
        drink: "never",
        //rent range
        rent_max: 4000,
        rent_min: 1000, 
        //living habits
        bedtime: 5, //1(before 10), 2(10pm-12am), 3(12am-2am), 4(2am-4am), 5(after 4am), 0(depends)
        quietness : 1, //rank out of 1-5
        cleanliness: 2 //rank out of 1-5
    },

    preferences: {
        //info
        gender: "okay", //same, okay(with anything)
        year: "okay", //same, okay
        pets: "yes", //yes, no
        //living style
        guests: "yes", //yes, no
        smoke: "no", //yes, no
        drink: "yes", //yes, no
        //living habits
        bedtime: "similar", //similar, okay
        quietness: "okay", //similar, okay
        cleanliness: "similar" //similar, okay
    }
  };

describe('Filter Function', () => {
    it('Should return -1 if not a possible match', () => {
        const arg1 = BarackObama;
        const arg2 = TaylorSwift;
        expect(compat.filter(arg1, arg2)).to.equal(-1);
    });
});

describe('Score Function', () => {
    it('Should calculate score correctly', () => {
        const arg1 = BarackObama;
        const arg2 = BobbyImpasto;
        expect(compat.score(arg1, arg2)).to.equal(19); // Expected score based on matching answers
    });
});

describe('Match Function', () => {
    it('Should return -1 if filter returns -1', () => {
        const arg1 = BarackObama;
        const arg2 = TaylorSwift;
        expect(compat.match(arg1, arg2)).to.equal(-1);
    });

    it('Should return correct score if not filtered out', () => {
        const arg1 = BobbyImpasto;
        const arg2 = BarackObama; // Same person for testing
        expect(compat.match(arg1, arg2)).to.equal(17); // Expected score based on matching answers
    });
});

describe('SortMatches Function', () => {
    it('Should return sorted list of keys based on values in descending order', () => {
        const dict = {
            "user1": 22,
            "user2": 30,
            "user3": 13
        };
        expect(compat.sortMatches(dict)).to.deep.equal(["user2", "user1", "user3"]); // Expected order after sorting
    });
});

describe('createMatches Function', () => {
    it('Should return sorted list of usernames based on compatibility scores', () => {
        const arg1 = BarackObama;
        const args = [BarackObama, BobbyImpasto]; // Include BarackObama to test self-match
        expect(compat.createMatches(arg1, args)).to.deep.equal(["BarackObama", "BobbyImpasto"]); // Expected order after creating matches and sorting
    });
});