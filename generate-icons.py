#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory
public_dir = 'public'

# Define colors for Leap Fitness branding
bg_color = '#3b82f6'  # Blue theme color
text_color = '#ffffff'

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_icon(size, filename):
    # Create image with blue background
    img = Image.new('RGB', (size, size), hex_to_rgb(bg_color))
    draw = ImageDraw.Draw(img)
    
    # Draw a simple dumbbell icon or text
    # Using circles and rectangles to create a simple dumbbell
    center = size // 2
    
    if size >= 192:
        # Dumbbell design
        weight_radius = size // 6
        bar_width = size // 20
        bar_length = size // 2
        
        # Left weight
        draw.ellipse([center - bar_length//2 - weight_radius, center - weight_radius,
                     center - bar_length//2 + weight_radius, center + weight_radius],
                    fill='white')
        
        # Right weight  
        draw.ellipse([center + bar_length//2 - weight_radius, center - weight_radius,
                     center + bar_length//2 + weight_radius, center + weight_radius],
                    fill='white')
        
        # Bar
        draw.rectangle([center - bar_length//2, center - bar_width//2,
                       center + bar_length//2, center + bar_width//2],
                      fill='white')
        
        # Add small details
        grip_width = bar_width // 2
        draw.rectangle([center - grip_width, center - bar_length//4,
                       center + grip_width, center + bar_length//4],
                      fill=hex_to_rgb(bg_color))
    
    # Save the image
    filepath = os.path.join(public_dir, filename)
    img.save(filepath, 'PNG', quality=95)
    print(f'Created {filepath} ({size}x{size})')

# Generate icons
create_icon(192, 'pwa-192x192.png')
create_icon(512, 'pwa-512x512.png')

print('Icons generated successfully!')
