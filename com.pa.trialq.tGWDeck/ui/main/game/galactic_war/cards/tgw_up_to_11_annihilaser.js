define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'The Annihilaser isn\'t OP, at least not until it costs 10x less.';
        },
        summarize: function(params) {
            return 'Annihilaser FTW';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_marshall_buff.png';
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
            var units = [
                '/pa/units/land/control_module/control_module.json'
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 0.1
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
