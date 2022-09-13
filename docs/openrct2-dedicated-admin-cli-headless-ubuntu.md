# Ubuntu OpenRCT2-CLI Dedicated Server Remote Installation

The documentation to install OpenRCT2 with a Docker installation including a remote admin CLI to assign an admin and execute commands.

## Why?

Well docker is easy to setup and you can run it cross platform with not a lot of hussle.

## Application Requirements

- docker-ce (https://docs.docker.com/engine/install/ubuntu/)

## File requirements

- config.ini `/home/${user}/.openrct2config/OpenRCT2/config.ini`
- groups.json `/home/${user}/.openrct2config/OpenRCT2/groups.json`
- users.json `/home/${user}/.openrct2config/OpenRCT2/users.json`
- plugin.store.json `/home/${user}/.openrct2config/OpenRCT2/plugin.store.json`
- remote-control.js `/home/${user}/.openrct2config/OpenRCT2/plugin/remote-control.js`

## Installation

**1. Install docker-ce**

Install docker-ce you can see the instructions here:

https://docs.docker.com/engine/install/ubuntu/

You can check if it is working with the command `docker info` it would give a result similar like this:

```
Client:
 Context:    default
 Debug Mode: false
 Plugins:
  app: Docker App (Docker Inc., v0.9.1-beta3)
  buildx: Docker Buildx (Docker Inc., v0.9.1-docker)
  compose: Docker Compose (Docker Inc., v2.10.2)
  scan: Docker Scan (Docker Inc., v0.17.0)

....etc
```

**2. Create files**

Before you create the files create these with the non-root user you made.

Replace `${user}` by the name of your current Linux user.

Create `/home/${user}/.openrct2config/OpenRCT2/config.ini` with contents:

```
[general]
always_show_gridlines = false
autosave = 1
autosave_amount = 10
confirmation_prompt = false
currency_format = EUR
custom_currency_rate = 10
custom_currency_affix = SUFFIX
custom_currency_symbol = "Ctm"
edge_scrolling = true
edge_scrolling_speed = 12
fullscreen_mode = 0
fullscreen_height = -1
fullscreen_width = -1
rct1_path = ""
game_path = ""
landscape_smoothing = true
language = nl-NL
measurement_format = METRIC
play_intro = false
save_plugin_data = true
debugging_tools = false
show_height_as_units = false
temperature_format = CELSIUS
window_height = -1
window_snap_proximity = 5
window_width = -1
default_display = 0
drawing_engine = SOFTWARE
uncap_fps = false
use_vsync = true
date_format = DD/MM/YY
auto_staff = true
handymen_mow_default = false
default_inspection_interval = 2
last_run_version = "0.3.5.1"
invert_viewport_drag = false
load_save_sort = NAME_ASCENDING
minimize_fullscreen_focus_loss = true
disable_screensaver = true
day_night_cycle = false
enable_light_fx = false
enable_light_fx_for_vehicles = false
upper_case_banners = false
disable_lightning_effect = false
allow_loading_with_incorrect_checksum = true
steam_overlay_pause = true
window_scale = 1.000000
scale_quality = SMOOTH_NEAREST_NEIGHBOUR
show_fps = false
multi_threading = false
trap_cursor = false
auto_open_shops = false
scenario_select_mode = 1
scenario_unlocking_enabled = true
scenario_hide_mega_park = true
last_game_directory = ""
last_landscape_directory = ""
last_scenario_directory = ""
last_track_directory = ""
use_native_browse_dialog = false
window_limit = 64
zoom_to_cursor = true
render_weather_effects = true
render_weather_gloom = true
show_guest_purchases = false
show_real_names_of_guests = true
allow_early_completion = false
virtual_floor_style = GLASSY
transparent_screenshot = true
transparent_water = true
last_version_check_time = 1641851613

[interface]
toolbar_show_finances = true
toolbar_show_research = true
toolbar_show_cheats = false
toolbar_show_news = false
toolbar_show_mute = false
toolbar_show_chat = false
toolbar_show_zoom = true
console_small_font = false
current_theme = "*RCT2"
current_title_sequence = "*OPENRCT2"
random_title_sequence = false
object_selection_filter_flags = 16383
scenarioselect_last_tab = 0

[sound]
audio_device = ""
master_sound = true
master_volume = 100
title_music = 2
sound = true
sound_volume = 100
ride_music = true
ride_music_volume = 100
audio_focus = false

[network]
player_name = "serverplayername"
default_port = 11753
listen_address = ""
default_password = ""
stay_connected = true
advertise = true
advertise_address = ""
maxplayers = 16
server_name = "servername"
server_description = ""
server_greeting = "Hi and welcome, enjoy our server."
master_server_url = ""
provider_name = "Bram Mittendorff"
provider_email = "botw44@gmail.com"
provider_website = ""
known_keys_only = false
log_chat = false
log_server_actions = false
pause_server_if_no_clients = false
desync_debugging = false

[notifications]
park_award = true
park_marketing_campaign_finished = true
park_warnings = true
park_rating_warnings = true
ride_broken_down = true
ride_crashed = true
ride_casualties = true
ride_warnings = true
ride_researched = true
ride_stalled_vehicles = true
guest_warnings = true
guest_left_park = true
guest_queuing_for_ride = true
guest_on_ride = true1
guest_left_ride = true
guest_bought_item = true
guest_used_facility = true
guest_died = true

[font]
file_name = ""
font_name = ""
x_offset = 0
y_offset = 1
size_tiny = 1
size_small = 0
size_medium = 0
size_big = 0
height_tiny = 0
height_small = 0
height_medium = 0
height_big = 0
enable_hinting = true
hinting_threshold = 0

[plugin]
enable_hot_reloading = false
allowed_hosts = "0.0.0.0"
```

Create `/home/${user}/.openrct2config/OpenRCT2/groups.json` with contents:

```
{
    "default_group": 2,
    "groups": [
        {
            "id": 0,
            "name": "Admin",
            "permissions": [
                "PERMISSION_CHAT",
                "PERMISSION_TERRAFORM",
                "PERMISSION_SET_WATER_LEVEL",
                "PERMISSION_TOGGLE_PAUSE",
                "PERMISSION_CREATE_RIDE",
                "PERMISSION_REMOVE_RIDE",
                "PERMISSION_BUILD_RIDE",
                "PERMISSION_RIDE_PROPERTIES",
                "PERMISSION_SCENERY",
                "PERMISSION_PATH",
                "PERMISSION_CLEAR_LANDSCAPE",
                "PERMISSION_GUEST",
                "PERMISSION_STAFF",
                "PERMISSION_PARK_PROPERTIES",
                "PERMISSION_PARK_FUNDING",
                "PERMISSION_KICK_PLAYER",
                "PERMISSION_MODIFY_GROUPS",
                "PERMISSION_SET_PLAYER_GROUP",
                "PERMISSION_CHEAT",
                "PERMISSION_TOGGLE_SCENERY_CLUSTER",
                "PERMISSION_PASSWORDLESS_LOGIN",
                "PERMISSION_MODIFY_TILE",
                "PERMISSION_EDIT_SCENARIO_OPTIONS"
            ]
        },
        {
            "id": 1,
            "name": "Spectator",
            "permissions": [
                "PERMISSION_CHAT"
            ]
        },
        {
            "id": 2,
            "name": "User",
            "permissions": [
                "PERMISSION_CHAT",
                "PERMISSION_TERRAFORM",
                "PERMISSION_SET_WATER_LEVEL",
                "PERMISSION_TOGGLE_PAUSE",
                "PERMISSION_CREATE_RIDE",
                "PERMISSION_REMOVE_RIDE",
                "PERMISSION_BUILD_RIDE",
                "PERMISSION_RIDE_PROPERTIES",
                "PERMISSION_SCENERY",
                "PERMISSION_PATH",
                "PERMISSION_CLEAR_LANDSCAPE",
                "PERMISSION_GUEST",
                "PERMISSION_STAFF",
                "PERMISSION_PARK_PROPERTIES",
                "PERMISSION_PARK_FUNDING",
                "PERMISSION_TOGGLE_SCENERY_CLUSTER"
            ]
        }
    ]
}
```

Create `/home/${user}/.openrct2config/OpenRCT2/users.json` with contents:

```
[
    {
        "groupId": 0,
        "hash": "",
        "name": "serverplayername"
    },
]
```

Create `/home/${user}/.openrct2config/OpenRCT2/plugin.store.json` with contents:

```
{"remote-control":{"host":"0.0.0.0"}}
```

Create `/home/${user}/.openrct2config/OpenRCT2/plugin/remote-control.js` with the contents of this github code:

https://raw.githubusercontent.com/CorySanin/openrct2-remote-control/master/lib/remote-control.js

You can download it with 1 command:

```
curl -o /home/${user}/.openrct2config/OpenRCT2/plugin/remote-control.js --create-dirs https://raw.githubusercontent.com/CorySanin/openrct2-remote-control/master/lib/remote-control.js
```

**3. Run the server**

Before you run the server login as the non-root user you created.

Run the server with the following command, and remember to replace `${user}` with your user:

```
docker run -p 11753:11753 -v /home/${user}/.openrct2config:/home/openrct2/.config corysanin/openrct2-cli:latest host clean-park-v3.park
```

## Problems with docker

### Sometimes not up to date

Mostly when you check the docker hub the versions are not up to date.

For example as time of writing the latest pushed tag in the docker image below is (`Last pushed 5 months ago by intelorca`):

https://hub.docker.com/r/openrct2/openrct2-cli/tags


    Solution

    The best person that updates the correct images is corysanin and he is running multiple servers so he should update most of the time. As time of writing the last docker image push is (Last pushed 2 months ago by corysanin):

    https://hub.docker.com/r/corysanin/openrct2-cli


