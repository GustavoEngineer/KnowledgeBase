import React, { useState } from 'react';
import './CenterPasswords.css'; // Utilizing existing styles including .prompt-overlay and .prompt-box

const AddCredential = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState({
        servicio: '',
        correo: '',
        contrasena_real: '',
        contrasena_cifrada_falsa: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <div className="detail-view"> {/* Reusing detail-view for animation and layout */}
            <h2 className="detail-title">NUEVA CREDENCIAL</h2>
            <form className="add-form-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="security-door-input"
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    placeholder="Nombre Servicio"
                    required
                    autoFocus
                />
                <input
                    type="text"
                    className="security-door-input"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    placeholder="Correo / Usuario"
                    required
                />
                <input
                    type="text"
                    className="security-door-input"
                    value={formData.contrasena_real}
                    onChange={(e) => setFormData({ ...formData, contrasena_real: e.target.value })}
                    placeholder="Contraseña REAL"
                    required
                />
                <input
                    type="text"
                    className="security-door-input"
                    value={formData.contrasena_cifrada_falsa}
                    onChange={(e) => setFormData({ ...formData, contrasena_cifrada_falsa: e.target.value })}
                    placeholder="Contraseña ENCRIPTADA"
                    required
                />

                <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
                    <button type="submit" className="hud-button primary">GUARDAR</button>
                    <button type="button" className="hud-button" onClick={onClose}>CANCELAR</button>
                </div>
            </form>
        </div>
    );
};

export default AddCredential;
