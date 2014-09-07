define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Buffs infernos, and allows you to build them';
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
                '/pa/units/land/vehicle_factory/vehicle_factory.json',
                '/pa/units/land/tank_armor/tank_armor.json'
            ]);
            var units = [
                '/pa/units/land/tank_armor/tank_armor.json',
            ];
            var mods = [];
            mods.push({
                file: '/pa/units/land/tank_armor/tank_armor.json',
                path: 'max_health',
                op: 'multiply',
                value: 2
            });
            mods.push({
                file: '/pa/units/land/tank_armor/tank_armor.json',
                path: 'build_metal_cost',
                op: 'multiply',
                value: 0.5
            });
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
