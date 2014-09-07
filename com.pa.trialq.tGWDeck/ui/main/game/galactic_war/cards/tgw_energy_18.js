define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Energy Tech, increases energy production by 18%';
        },
        summarize: function(params) {
            return 'Energy +18%';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_energy_18.png';
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 41;
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
                    value: 1.18
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
