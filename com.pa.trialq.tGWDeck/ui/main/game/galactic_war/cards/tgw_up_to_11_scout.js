define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Buffs all scouts, and allows you to build them';
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
                '/pa/units/air/vehicle_factory/vehicle_factory.json',
                '/pa/units/sea/naval_factory/naval_factory.json',
                '/pa/units/land/land_scout/land_scout.json',
                '/pa/units/air/air_scout/air_scout.json',
                '/pa/units/sea/sea_scout/sea_scout.json'
            ]);
            var units = [
                '/pa/units/land/land_scout/land_scout.json',
                '/pa/units/air/air_scout/air_scout.json',
                '/pa/units/sea/sea_scout/sea_scout.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 0.02
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
