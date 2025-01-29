#!/bin/bash

# Directory paths
SOURCE_DIR="src/games/source"
OUTPUT_DIR="public/games"

# Create output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Compile each .c file in the source directory
for game in $SOURCE_DIR/*.c; do
    if [ -f "$game" ]; then
        filename=$(basename "$game" .c)
        echo "Compiling $filename..."
        
        emcc "$game" \
            -o "$OUTPUT_DIR/$filename.js" \
            -s WASM=1 \
            -s EXPORTED_FUNCTIONS='["_main", "_init_game", "_update_game", "_draw_game", "_handle_input"]' \
            -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
            -s ALLOW_MEMORY_GROWTH=1 \
            -s INITIAL_MEMORY=16MB \
            -s USE_SDL=2 \
            -s USE_SDL_IMAGE=2 \
            --preload-file assets
    fi
done

echo "Compilation complete!"