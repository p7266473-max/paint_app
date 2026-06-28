import streamlit as st
from streamlit_drawable_canvas import st_canvas
from PIL import Image, ImageDraw
import math

st.set_page_config(page_title="Core Sandbox Engine", layout="wide")


# Playful kids theme styles
st.markdown("""
<style>
    /* Warm, child-friendly background color */
    .stApp {
        background-color: #FFFDF2;
        font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
    }
    
    /* Playful Title styling */
    h1 {
        color: #FF5A5F;
        text-shadow: 2px 2px 0px #FFD166;
        font-size: 3rem !important;
        text-align: center;
        margin-bottom: 5px !important;
    }
    
    .subtitle {
        text-align: center;
        color: #4A4A4A;
        font-size: 1.3rem;
        margin-bottom: 25px;
    }
    
    /* Custom Styling for control panel cards */
    .kids-card {
        background-color: #FFFFFF;
        border: 4px solid #FFD166;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 6px 6px 0px #FFD166;
        margin-bottom: 20px;
    }
    
    .canvas-border {
        border: 6px solid #4ECDC4;
        border-radius: 25px;
        overflow: hidden;
        box-shadow: 8px 8px 0px #4ECDC4;
        background-color: #FFFFFF;
        display: inline-block;
    }
    
    /* Style normal buttons to be round and chunky */
    button {
        font-size: 1.1rem !important;
        font-weight: bold !important;
        border-radius: 15px !important;
        border: 3px solid #333333 !important;
        padding: 10px 15px !important;
        background-color: #FFFFFF !important;
        transition: transform 0.1s ease !important;
    }
    
    button:hover {
        transform: scale(1.05) !important;
        border-color: #FF5A5F !important;
        background-color: #FFF5F5 !important;
    }
    
    button:active {
        transform: scale(0.95) !important;
    }
</style>
""", unsafe_allow_html=True)

# Define preset kid-friendly colors
PRESET_COLORS = {
    "🔴 Red": "#FF3B30",
    "🟠 Orange": "#FF9500",
    "🟡 Yellow": "#FFCC00",
    "🟢 Green": "#34C759",
    "🔵 Blue": "#007AFF",
    "🟣 Purple": "#5856D6",
    "🌸 Pink": "#FF2D55",
    "🟤 Brown": "#A25A12",
    "⚫ Black": "#000000",
    "⚪ Eraser": "#FFFFFF"
}

# Helper to convert hex to rgba
def hex_to_rgba(hex_color, opacity=1.0):
    hex_color = hex_color.lstrip('#')
    try:
        r, g, b = [int(hex_color[i:i+2], 16) for i in range(0, 6, 2)]
    except Exception:
        r, g, b = 0, 0, 0
    return f"rgba({r}, {g}, {b}, {opacity})"

# Helper to generate PIL templates for tracing
@st.cache_resource
def get_template_image(template_name, width=700, height=450):
    img = Image.new("RGBA", (width, height), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # Use standard grey for dotted outlines
    outline_color = (200, 200, 200, 255)
    
    if template_name == "Circle ⭕":
        cx, cy, r = width // 2, height // 2, min(width, height) // 3
        # Draw a thick outline for tracing
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=outline_color, width=5)
        
    elif template_name == "Star ⭐️":
        cx, cy = width // 2, height // 2
        r_outer = min(width, height) // 3
        r_inner = r_outer // 2
        points = []
        for i in range(10):
            angle = i * math.pi / 5 - math.pi / 2
            r = r_outer if i % 2 == 0 else r_inner
            x = cx + r * math.cos(angle)
            y = cy + r * math.sin(angle)
            points.append((x, y))
        draw.polygon(points, outline=outline_color, width=5)
        
    elif template_name == "Letter A 🅰️":
        # Draw a big simple letter A
        top = (width // 2, height // 5)
        left = (width // 3, 4 * height // 5)
        right = (2 * width // 3, 4 * height // 5)
        bar_left = (width // 2 - width // 10, height // 2 + height // 12)
        bar_right = (width // 2 + width // 10, height // 2 + height // 12)
        draw.line([top, left], fill=outline_color, width=8)
        draw.line([top, right], fill=outline_color, width=8)
        draw.line([bar_left, bar_right], fill=outline_color, width=8)
        
    elif template_name == "Balloon 🎈":
        # Balloon ellipse
        draw.ellipse([width // 2 - 60, height // 3 - 80, width // 2 + 60, height // 3 + 60], outline=outline_color, width=5)
        # Small triangle knot
        draw.polygon([(width // 2 - 12, height // 3 + 60), (width // 2 + 12, height // 3 + 60), (width // 2, height // 3 + 75)], outline=outline_color, fill=outline_color)
        # Wavy string
        draw.line([(width // 2, height // 3 + 75), (width // 2 - 15, height // 3 + 120), (width // 2 + 15, height // 3 + 175), (width // 2, height // 3 + 230)], fill=outline_color, width=4)
        
    elif template_name == "Blank ⬜":
        return None
        
    return img

# Initialize session state variables
if "stroke_color" not in st.session_state:
    st.session_state.stroke_color = "#FF3B30"  # Default Red
if "tool" not in st.session_state:
    st.session_state.tool = "freedraw"  # Default drawing mode
if "is_highlighter" not in st.session_state:
    st.session_state.is_highlighter = False
if "stroke_width" not in st.session_state:
    st.session_state.stroke_width = 12
if "canvas_version" not in st.session_state:
    st.session_state.canvas_version = 0
if "fill_shapes" not in st.session_state:
    st.session_state.fill_shapes = False

# Layout header
st.write("<h1>🎨 Kids Paint & Trace! 🖌️</h1>", unsafe_allow_html=True)
st.write("<div class='subtitle'>A fun drawing canvas for little artists (ages 5-8)</div>", unsafe_allow_html=True)

# Main structure: 2 Columns
col_controls, col_canvas = st.columns([1, 2], gap="large")

with col_controls:
    # 1. Colors palette
    st.markdown("<div class='kids-card'>", unsafe_allow_html=True)
    st.subheader("🎨 Pick a Color!")
    
    # We lay out buttons in a grid
    grid_cols = st.columns(3)
    color_keys = list(PRESET_COLORS.keys())
    
    for i, color_name in enumerate(color_keys):
        hex_val = PRESET_COLORS[color_name]
        with grid_cols[i % 3]:
            # Highlight current color
            is_active = (st.session_state.stroke_color == hex_val and not (color_name == "⚪ Eraser" and st.session_state.stroke_color == "#FFFFFF" and st.session_state.tool == "freedraw" and not st.session_state.is_highlighter))
            # Emojis on buttons
            if st.button(color_name, key=f"color_{i}", use_container_width=True):
                st.session_state.stroke_color = hex_val
                if color_name == "⚪ Eraser":
                    st.session_state.tool = "freedraw"
                    st.session_state.is_highlighter = False
                st.rerun()
                
    # Show active color display
    active_display_color = st.session_state.stroke_color
    text_color = "black" if active_display_color in ["#FFCC00", "#FFFFFF"] else "white"
    st.markdown(f"""
        <div style="
            background-color: {active_display_color};
            height: 35px;
            border-radius: 12px;
            border: 3px solid #333333;
            margin-top: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: {text_color};
            font-weight: bold;
            font-size: 1rem;
            box-shadow: 3px 3px 0px #333333;
        ">
            Active Color: {st.session_state.stroke_color}
        </div>
    """, unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
    
    # 2. Tools
    st.markdown("<div class='kids-card'>", unsafe_allow_html=True)
    st.subheader("🖌️ Choose a Tool!")
    
    tool_col1, tool_col2 = st.columns(2)
    
    with tool_col1:
        if st.button("✏️ Paint Pen", use_container_width=True, key="tool_pen"):
            st.session_state.tool = "freedraw"
            st.session_state.is_highlighter = False
            st.rerun()
        if st.button("⭕ Circle Shape", use_container_width=True, key="tool_circle"):
            st.session_state.tool = "circle"
            st.session_state.is_highlighter = False
            st.rerun()
            
    with tool_col2:
        if st.button("🖊️ Highlighter", use_container_width=True, key="tool_highlighter"):
            st.session_state.tool = "freedraw"
            st.session_state.is_highlighter = True
            st.rerun()
        if st.button("⏹️ Square Shape", use_container_width=True, key="tool_rect"):
            st.session_state.tool = "rect"
            st.session_state.is_highlighter = False
            st.rerun()

    # Move and Resize tool
    if st.button("🖐️ Move & Resize Shapes", use_container_width=True, key="tool_transform"):
        st.session_state.tool = "transform"
        st.session_state.is_highlighter = False
        st.rerun()

    # Extra shape options
    st.session_state.fill_shapes = st.checkbox("🌈 Fill shapes with color?", value=st.session_state.fill_shapes)
    
    # Display active tool indicator
    current_tool_display = "✏️ Paint Pen"
    if st.session_state.is_highlighter:
        current_tool_display = "🖊️ Highlighter (Trace Mode)"
    elif st.session_state.tool == "circle":
        current_tool_display = "⭕ Circle Shape"
    elif st.session_state.tool == "rect":
        current_tool_display = "⏹️ Square Shape"
    elif st.session_state.tool == "transform":
        current_tool_display = "🖐️ Move & Resize Shapes"
        
    st.markdown(f"**Current Tool:** `{current_tool_display}`")
    st.markdown("</div>", unsafe_allow_html=True)
    
    # 3. Canvas Controls & Tracing
    st.markdown("<div class='kids-card'>", unsafe_allow_html=True)
    st.subheader("🖍️ Brush & Templates")
    
    # Brush size slider
    st.session_state.stroke_width = st.slider("Brush Thickness", min_value=3, max_value=50, value=st.session_state.stroke_width, step=2)
    
    # Tracing background image selector
    template_name = st.selectbox(
        "Trace a shape:",
        ["Blank ⬜", "Circle ⭕", "Star ⭐️", "Letter A 🅰️", "Balloon 🎈"]
    )
    
    # Reset button
    if st.button("🗑️ Clear Canvas", use_container_width=True, key="clear_canvas"):
        st.session_state.canvas_version += 1
        st.rerun()
        
    st.markdown("</div>", unsafe_allow_html=True)

with col_canvas:
    # Set canvas parameters
    stroke_color_final = st.session_state.stroke_color
    if st.session_state.is_highlighter:
        # Convert selected stroke color to a semi-transparent version (40% opacity)
        stroke_color_final = hex_to_rgba(st.session_state.stroke_color, 0.40)
        
    # Fill color logic
    if st.session_state.fill_shapes:
        fill_color_final = hex_to_rgba(st.session_state.stroke_color, 0.45)
    else:
        fill_color_final = "rgba(0, 0, 0, 0)"
        
    # Generate background tracing template
    bg_image = get_template_image(template_name, width=700, height=450)
    
    # Render canvas inside a border container
    st.markdown("<div class='canvas-border'>", unsafe_allow_html=True)
    canvas_result = st_canvas(
        fill_color=fill_color_final,
        stroke_width=st.session_state.stroke_width,
        stroke_color=stroke_color_final,
        background_color="#FFFFFF",
        background_image=bg_image,
        height=450,
        width=700,
        drawing_mode=st.session_state.tool,
        update_streamlit=True,
        key=f"canvas_{st.session_state.canvas_version}",
    )
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Optional image download/preview for kids
    st.write("🎉 Draw anything you like! You can trace the shapes or make your own masterwork.")
