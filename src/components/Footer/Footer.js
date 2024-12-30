import React from 'react'

function Footer() {
  return (
    <footer style={{ 
        position: 'fixed',
        bottom : 0,
        left : 0,
        right : 0,
        backgroundColor: "#333", 
        color: "white", 
        textAlign: "center", 
        padding: "20px", 
        marginTop: "30px" 
    }}>
        <p>&copy; {new Date().getFullYear()} Data Structure Visualizer. All rights reserved.</p>
        <p>Designed and developed with 💻 by <a href="https://github.com/rohitPandey469" style={{ color: "#00d8ff" }}>Harsh Anand</a></p>
    </footer>
  )
}

export default Footer