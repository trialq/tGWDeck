define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Damage Tech, increases the damage dealt with offensive weapons by 3%';
        },
        summarize: function(params) {
            return 'Damage +3%';
        },
        icon: function(params) {
            return 'coui://ui/mods/tGWDeck/tgw_damage_3.png';
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
                '/pa/units/air/bomber/bomber_ammo.json',
                '/pa/units/air/figher/fighter_ammo.json',
                '/pa/units/air/bomber_adv/bomber_adv_ammo.json',
                '/pa/units/air/figher_adv/figher_adv_ammo.json',
                '/pa/units/air/gunship/gunship_ammo.json',
                '/pa/units/land/assault_bot/assault_bot_ammo.json',
                '/pa/units/land/bot_aa/bot_aa_ammo.json',
                '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                '/pa/units/land/assault_bot_adv/assault_bot_adv_ammo.json',
                '/pa/units/land/bot_sniper/bot_sniper_ammo.json',
                '/pa/ammo/mine_pbaoe/mine_pbaoe.json',
                '/pa/units/land/air_defense/air_defense_ammo.json',
                '/pa/units/land/laser_defense_single/laser_defense_single_ammo.json',
                '/pa/units/land/laser_defense/laser_defense_ammo.json',
                '/pa/units/land/air_defense_adv/air_defense_adv_ammo.json',
                '/pa/units/land/laser_defense_adv/laser_defense_adv_ammo.json',
                '/pa/units/sea/torpedo_launcher/torpedo_launcher_ammo.json',
                '/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv_ammo.json',
                '/pa/units/land/tactical_missile_launcher/tactical_missile_launcher_ammo.json',
                '/pa/units/orbital/ion_defense/ion_defense_ammo.json',
                '/pa/units/orbital/orbital_fighter/orbital_fighter_ammo.json',
                '/pa/units/orbital/defense_satellite/defense_satellite_ammo.json',
                '/pa/units/orbital/orbital_laser/orbital_laser_ammo.json',
                '/pa/units/sea/frigate/frigate_ammo_shell.json',
                '/pa/units/sea/frigate/frigate_ammo_aa.json',
                '/pa/units/sea/destroyer/destroyer_ammo.json',
                '/pa/units/sea/destroyer/destroyer_torpedo_ammo.json',
                '/pa/units/sea/sea_scout/sea_scout_ammo.json',
                '/pa/units/sea/missile_ship/missile_ship_aa_ammo.json',
                '/pa/units/sea/missile_ship/missile_ship_ammo.json',
                '/pa/units/sea/battleship/battleship_ammo.json',
                '/pa/units/land/tank_light_laser/tank_light_laser_ammo.json',
                '/pa/units/land/aa_missile_vehicle/aa_missile_vehicle_ammo.json',
                '/pa/units/land/tank_armor/tank_armor_ammo.json',
                '/pa/units/land/land_scout/land_scout_ammo.json',
                '/pa/units/land/tank_laser_adv/tank_laser_adv_ammo.json',
                '/pa/units/land/tank_heavy_armor/tank_heavy_armor_ammo.json'
            ];
            var units_with_splash = [
                '/pa/units/land/artillery_short/artillery_short_ammo.json',
                '/pa/units/land/artillery_long/artillery_long_ammo.json',
                '/pa/units/land/tank_heavy_mortar/tank_heavy_mortar_ammo.json',
                '/pa/units/land/bot_grenadier/bot_grenadier_ammo.json',
                '/pa/units/commanders/base_commander/base_commander_ammo.json',
                '/pa/ammo/cannon_uber/cannon_uber.json'
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.03
                });
            };
            _.forEach(units, modUnit);
            var modUnitSplash = function(unit) {
                mods.push({
                    file: unit,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.03
                });
                mods.push({
                    file: unit,
                    path: 'splash_damage',
                    op: 'multiply',
                    value: 1.03
                });
            };
            _.forEach(units_with_splash, modUnitSplash);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
