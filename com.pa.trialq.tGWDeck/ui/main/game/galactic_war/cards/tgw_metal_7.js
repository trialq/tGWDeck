define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Metal Tech, increases metal production by 7%';
        },
        summarize: function(params) {
            return 'Metal +7%';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_metal_7.png';
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
                '/pa/units/land/metal_extractor/metal_extractor.json',
                '/pa/units/land/metal_extractor_adv/metal_extractor_adv.json',
                '/pa/units/commanders/base_commander/base_commander.json'
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'production.metal',
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
