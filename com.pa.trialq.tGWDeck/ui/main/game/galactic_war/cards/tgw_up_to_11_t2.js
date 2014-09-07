define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Reduces the cost of tier 2 factories, and allows you to build them if you can build the tier 1 equivalent';
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
                '/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json',
                '/pa/units/land/bot_factory_adv/bot_factory_adv.json',
                '/pa/units/air/air_factory_adv/air_factory_adv.json',
                '/pa/units/sea/naval_factory_adv/naval_factory_adv.json',
                '/pa/units/orbital/orbital_factory/orbital_factory.json'
            ]);
            var units = [
                '/pa/units/orbital/orbital_factory/orbital_factory.json',
                '/pa/units/air/air_factory_adv/air_factory_adv.json',
                '/pa/units/land/bot_factory_adv/bot_factory_adv.json',
                '/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json',
                '/pa/units/sea/naval_factory_adv/naval_factory_adv.json'
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 0.125
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
