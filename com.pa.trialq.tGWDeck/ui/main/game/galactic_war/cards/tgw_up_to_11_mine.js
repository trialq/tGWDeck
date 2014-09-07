define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Buffs mines, and allows you to build them';
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
                '/pa/units/land/bot_factory/bot_factory.json',
                '/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json',
                '/pa/units/land/land_mine/land_mine.json'

            ]);
            var mods = [];
            mods.push({
                file: '/pa/units/land/land_mine/land_mine_tool_weapon.json',
                path: 'max_range',
                op: 'multiply',
                value: 6
            });
            mods.push({
                file: '/pa/ammo/mine_pbaoe/mine_pbaoe.json',
                path: 'splash_radius',
                op: 'multiply',
                value: 4
            });
            mods.push({
                file: '/pa/ammo/mine_pbaoe/mine_pbaoe.json',
                path: 'sim_fire_effect',
                op: 'replace',
                value: "/pa/effects/specs/default_building_explosion.pfx"
            });
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
