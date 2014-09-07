define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Energy Tech, increases energy production by 7%';
        },
        summarize: function(params) {
            return 'Energy +7%';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_energy_7.png';
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 0;
            if (context.totalSize < 15) {
                chance = 1;
            } else if (context.totalSize < 25) {
                chance = 1;
            } else if (context.totalSize < 40) {
                chance = 107;
            } else {
                chance = 107;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/energy_plant/energy_plant.json',
                '/pa/units/land/energy_plant_adv/energy_plant_adv.json',
                '/pa/units/orbital/solar_array/solar_array.json',
                '/pa/units/commanders/base_commander/base_commander.json'
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'production.energy',
                    op: 'multiply',
                    value: 1.07
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
