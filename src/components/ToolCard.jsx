import { motion } from "framer-motion";

const ToolCard = ({ tool, onClick }) => {
  const styles = {
    card: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer'
    },
    cardHover: {
      borderColor: 'rgba(66, 248, 245, 0.3)',
      boxShadow: '0 10px 15px -3px rgba(66, 248, 245, 0.1)',
      transform: 'translateY(-3px)'
    },
    iconContainer: {
      width: '48px',
      height: '48px',
      background: 'rgba(30, 41, 59, 0.5)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: '#42f8f5'
    }
  };

  return (
    <motion.div
      style={styles.card}
      whileHover={styles.cardHover}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(tool)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={styles.iconContainer}>
            {tool.icon || '📄'}
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', margin: 0 }}>
            {tool.name}
          </h3>
        </div>
        
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem', flexGrow: 1 }}>
          {tool.description || `Quickly ${tool.name.toLowerCase()} your documents`}
        </p>
      </div>
    </motion.div>
  );
};

export default ToolCard;