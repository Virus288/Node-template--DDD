# Bootstrap

Bootstrap is a simple wrapper, for domain based modules. Its job is to register selected domain and initialize all sub modules. Each module in this case is also its own wrapper, for its own modules.

Each domain includes submodules, which are being registered by their parents.

Modules and submodules include abstract classes, which manage their controllers. You can find those in /src/tools/abstract
