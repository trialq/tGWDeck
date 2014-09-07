define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return "Build Tech, increases the fabrication rate of all fabricators by 3%";
        },
        summarize: function(params) {
            return 'Build +3%';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_build_3.png';
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
                chance = 1;
            } else {
                chance = 250;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/vehicle_factory/vehicle_factory_build_arm.json',
                '/pa/units/land/fabrication_vehicle/fabrication_vehicle_build_arm.json',
                '/pa/units/land/vehicle_factory_adv/vehicle_factory_adv_build_arm.json',
                '/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv_build_arm.json',
                '/pa/units/land/bot_factory/bot_factory_build_arm.json',
                '/pa/units/land/fabrication_bot/fabrication_bot_build_arm.json',
                '/pa/units/land/fabrication_bot_combat/fabrication_bot_combat_build_arm.json',
                '/pa/units/land/bot_factory_adv/bot_factory_adv_build_arm.json',
                '/pa/units/land/fabrication_bot_adv/fabrication_bot_adv_build_arm.json',
                '/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv_build_arm.json',
                '/pa/units/air/air_factory/air_factory_build_arm.json',
                '/pa/units/air/fabrication_aircraft/fabrication_aircraft_build_arm.json',
                '/pa/units/air/air_factory_adv/air_factory_adv_build_arm.json',
                '/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv_build_arm.json',
                '/pa/units/sea/naval_factory/naval_factory_build_arm.json',
                '/pa/units/sea/fabrication_ship/fabrication_ship_build_arm.json',
                '/pa/units/sea/naval_factory_adv/naval_factory_adv_build_arm.json',
                '/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv_build_arm.json',
                '/pa/units/orbital/orbital_launcher/orbital_launcher_build_arm.json',
                '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot_build_arm.json',
                '/pa/units/orbital/orbital_factory/orbital_factory_build_arm.json',
                '/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_build_arm.json',
                '/pa/tools/commander_build_arm/commander_build_arm.json'
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'construction_demand.metal',
                    op: 'multiply',
                    value: 1.03
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
