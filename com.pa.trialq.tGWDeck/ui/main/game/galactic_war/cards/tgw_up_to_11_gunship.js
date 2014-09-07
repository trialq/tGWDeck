define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Buffs Kestrels, and allows you to build them';
        },
        summarize: function(params) {
            return 'Uber Buff';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_uber_buff.png';
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 10;
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/air/air_factory/air_factory.json',
                '/pa/units/air/air_factory_adv/air_factory_adv.json',
                '/pa/units/air/fabrication_aircraft/fabrication_aircraft.json',
                '/pa/units/air/gunship/gunship.json',
            ]);
            var mods = [];
            mods.push({
                file: '/pa/units/air/gunship/gunship_ammo.json',
                path: 'damage',
                op: 'multiply',
                value: 4
            });
            mods.push({
                file: '/pa/units/air/gunship/gunship.json',
                path: 'max_health',
                op: 'multiply',
                value: 2
            });
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
