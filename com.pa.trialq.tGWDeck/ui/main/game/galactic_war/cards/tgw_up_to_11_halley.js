define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'That\'s no moon! ... actually it is, and it\'s coming this way rather fast. Quarter the cost, and it may survive for another go.';
        },
        summarize: function(params) {
            return 'Halley FTW';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_wrongcat_buff.png';
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 1000;
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/orbital/delta_v_engine/delta_v_engine.json'
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 0.25
                });
                mods.push({
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 10
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
