#!/usr/bin/env python3
"""
Simple script to remove background from image and extract the girl.
Requires: pip install pillow
"""

try:
    from PIL import Image
    import numpy as np
except ImportError:
    print("PIL/Pillow not installed. Installing...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "numpy"])
    from PIL import Image
    import numpy as np

def remove_background(input_path, output_path):
    """Remove background from image, keeping only the girl and clothes."""
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Convert to numpy array for processing
        data = np.array(img)
        
        # Get image dimensions
        height, width = data.shape[:2]
        
        # Simple background removal: detect and remove dark blue/black background
        # Adjust these thresholds based on your specific image
        for y in range(height):
            for x in range(width):
                r, g, b, a = data[y, x]
                
                # Remove dark backgrounds (adjust thresholds as needed)
                is_dark = r < 60 and g < 60 and b < 100
                is_blue_bg = b > r + 30 and b > g + 30 and r < 120 and g < 120
                is_very_dark = (r + g + b) < 150
                
                # Make background transparent
                if is_dark or is_blue_bg or is_very_dark:
                    data[y, x] = [0, 0, 0, 0]  # Transparent
        
        # Create new image from processed data
        result = Image.fromarray(data, 'RGBA')
        
        # Save as PNG with transparency
        result.save(output_path, 'PNG')
        print(f"Successfully extracted image saved to: {output_path}")
        return True
        
    except Exception as e:
        print(f"Error processing image: {e}")
        return False

if __name__ == "__main__":
    input_file = "Screenshot 2026-01-01 at 2.49.12 AM.png"
    output_file = "girl-extracted.png"
    
    print(f"Processing {input_file}...")
    if remove_background(input_file, output_file):
        print("Done! The extracted image is saved as 'girl-extracted.png'")
    else:
        print("Failed to process image. Please use the HTML tool (extract-image.html) instead.")

