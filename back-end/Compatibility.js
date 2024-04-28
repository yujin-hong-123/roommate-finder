const BarackObama = {
    login: {
        username: "BarackObama",
        password: "obamaSecure456"
    },
    profile: {
        name: "",
        year: "",
        bio: ""
      },
      answers: {
          gender: "",
          year: "",
          pets: "",
          guests: "",
          smoke: "",
          drink: "",
          rent_max: 0,
          rent_min: 0, 
          bedtime: 0,
          quietness : 0,
          cleanliness: 0
      },
      preferences: {
          gender: "",
          year: "", 
          pets: "", 
          guests: "",
          smoke: "",
          drink: "",
          bedtime: "",
          quietness: "",
          cleanliness: ""
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

//must must match
function filter(arg1, arg2){
    //info check
    //gender
    if (arg1.preferences.gender === "same") {
        if (arg1.answers.gender !== arg2.answers.gender) {
            return -1;
        }
    }
    //year
    if (arg1.preferences.year === "same") {
        if (arg1.answers.year !== arg2.answers.year) {
            return -1;
        }
    }
    //pets
    if (arg1.preferences.pets === "no") {
        if (arg2.answers.pets === "yes") {
            return -1;
        }
    }

    //living style check
    //guests
    if (arg1.preferences.guests === "no") {
        if (arg2.answers.guests !== "never") {
            return -1;
        }
    }
    //smoke
    if (arg1.preferences.smoke === "no") {
        if (arg2.answers.smoke !== "never") {
            return -1;
        }
    }
    //drink
    if (arg1.preferences.drink === "no") {
        if (arg2.answers.drink !== "never") {
            return -1;
        }
    }

    //rent range
    if (arg1.answers.rent_max < arg2.answers.rent_min)
        return -1;

    if (arg1.answers.rent_min > arg2.answers.rent_max)
        return -1;
}

function score(arg1, arg2) {
    var score = 0;

    //guest
    if (arg1.answers.guests === arg2.answers.guests) {
        score += 5;
    } 
    else if (arg1.answers.guests === "sometimes" || arg2.answers.guests === "sometimes")  {
        score += 3;
    }
    else {
        score += 1;
    }

    //smoke
    if (arg1.answers.smoke === arg2.answers.smoke) {
        score += 5;
    }
    else if (arg1.answers.smoke === "sometimes" || arg2.answers.smoke === "sometimes")  {
        score += 3;
    }
    else {
        score += 1;
    }

    //drink
    if (arg1.answers.drink === arg2.answers.drink) {
        score += 5;
    }
    else if (arg1.answers.drink === "sometimes" || arg2.answers.drink === "sometimes")  {
        score += 3;
    }
    else {
        score += 1;
    }

    //bedtime
    if (arg1.preferences.bedtime === "similar") {
        if (arg1.answers.bedtime === arg2.answers.bedtime) {
            score += 5;
        }
        else if (arg1.answers.bedtime === 6 || arg2.answers.bedtime === 6) {
            score += 3;
        }
        else {
            score += 5 - Math.abs(arg1.answers.bedtime - arg2.answers.bedtime)
        }
    }
    else {
        score += 5;
    }

    //quietness
    if (arg1.preferences.quietness === "similar") {
        if (arg1.answers.quietness === arg2.answers.quietness) {
            score += 5;
        }
        else if (arg1.answers.quietness === 0 || arg2.answers.quietness === 0) {
            score += 3;
        }
        else {
            score += 5 - Math.abs(arg1.answers.quietness - arg2.answers.quietness)
        }
    }
    else {
        score += 5;
    }

    //cleanliness
    if (arg1.preferences.cleanliness === "similar") {
        if (arg1.answers.cleanliness === arg2.answers.cleanliness) {
            score += 5;
        }
        else if (arg1.answers.cleanliness === 0 || arg2.answers.cleanliness === 0) {
            score += 3;
        }
        else {
            score += 5 - Math.abs(arg1.answers.cleanliness - arg2.answers.cleanliness)
        }
    }
    else {
        score += 5;
    }

    return score;
}

function match(arg1, arg2) {
    if (filter(arg1, arg2) === -1) {
        return -1;
    }
    else {
        return score(arg1, arg2);
    }
}

function sortMatches(dict) {
    var items = Object.keys(dict).map(
        (key) => { return [key, dict[key]] });

      items.sort(function(a,b){return b[1] - a[1]});
      
      var sortedKeys = items.map(
        (e) => { return e[0] });
      
      return sortedKeys;
}

function createMatches(arg1, [...args]) {
    let matchList = {};

    for (const arg of args) {
        if (match(arg1, arg) !== -1) {
            matchList[arg.username] = match(arg1, arg);
        }
    }

    return sortMatches(matchList);
}


module.exports = {
    filter,
    score,
    match,
    sortMatches,
    createMatches
};