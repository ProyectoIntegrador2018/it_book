import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button } from "react-bootstrap";
import { CurrentUserContext } from "../../CurrentUserContext";
import "./FormEmpresa.css";
import { useHistory } from "react-router";

// Componente del formulario para dar de alta una empresa

const FormEmpresa = (props) => {
	const firebase = useContext(FirebaseContext);
	const [item, setItem] = useState({
		nombre_comercial: "",
		giro: "",
		descripcion: "",
		domicilio: "",
		colonia: "",
		municipio: "",
		cp: "",
		telefono: "",
		email: "",
		pagina_web: "",
		nombre_ceo: "",
		email_ceo: "",
		razon_social: "",
		servicios: "",
		num_emp_nl: 0,
		num_emp_mx: 0,
		num_emp_nomx: 0,
		redes_sociales: "",
		num_emp_ti: 0,
		num_emp_adm: 0,
		porcentaje_ventas_nat: 0,
		porcentaje_ventas_ext: 0,
		paises_exp_princ: "",
		ventas_anuales: 0,
		certificaciones: "",
		num_cert_emp: 0,
	});
	const [validated, setValidated] = useState(false);
	const { currentUser, fetchCurrentUser } =
		React.useContext(CurrentUserContext);
	const history = useHistory();

	if (currentUser === null && currentUser === undefined) {
		history.push("/");
	} else if (currentUser.userData.hasEmpresa) {
		history.push("/");
	}
	// función para subir cambios a la base de datos
	const submitChanges = async (event) => {
		event.preventDefault();
		let message = "Se ha subido la empresa";
		const form = event.currentTarget;

		try {
			// Verifica que ningún campo esté vacío
			if (form.checkValidity() === false) {
				console.log(form.checkValidity());
				message = "Campos sin responder";
				event.stopPropagation();
			} else {
				// Añade la empresa a la base de datos
				const copy = item;
				firebase.addEmpresa(copy).then((empresa) => {
					firebase.setHasEmpresa(currentUser.uid, true, empresa.id);
					fetchCurrentUser();
					history.push("/");
				});
				console.log(copy);
			}
		} catch (e) {
			console.log(e);
			message =
				"Ha ocurrido un error, revise que toda la información sea correcta,\nY que tiene buena conexión de internet.";
		}
		setValidated(true);
		window.alert(message);
	};

	return (
		<div id='formContainer'>
			<Form
				id='formEmpresa'
				noValidate
				validated={validated}
				onSubmit={submitChanges}
			>
				{/* <h2>IT-BOOK</h2> */}

				<div style={{ paddingBottom: "10px" }}>
					<h3 style={{ color: "#f05d29" }}>Registra tu empresa</h3>
				</div>

				<h5>Datos Públicos</h5>

				<Form.Group controlId=''>
					<Form.Label>Nombre Comercial</Form.Label>
					<Form.Control
						placeholder='Nombre Comercial'
						onChange={(str) => {
							setItem({
								...item,
								nombre_comercial: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Giro / Especialidad</Form.Label>
					<Form.Control
						placeholder='Giro / Especialidad'
						onChange={(str) => {
							setItem({
								...item,
								giro: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Descipción de la empresa</Form.Label>
					<Form.Control
						as='textarea'
						placeholder='Descipción de la empresa'
						onChange={(str) => {
							setItem({
								...item,
								descripcion: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Domicilio</Form.Label>
					<Form.Control
						placeholder='Domicilio'
						onChange={(str) => {
							setItem({
								...item,
								domicilio: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Colonia</Form.Label>
					<Form.Control
						placeholder='Colonia'
						onChange={(str) => {
							setItem({
								...item,
								colonia: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Municipio</Form.Label>
					<Form.Control
						placeholder='Municipio'
						onChange={(str) => {
							setItem({
								...item,
								municipio: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Código Postal</Form.Label>
					<Form.Control
						placeholder='Código Postal'
						onChange={(str) => {
							setItem({
								...item,
								cp: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Teléfono</Form.Label>
					<Form.Control
						placeholder='Teléfono'
						onChange={(str) => {
							setItem({
								...item,
								telefono: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Correo</Form.Label>
					<Form.Control
						type='email'
						placeholder='Correo'
						onChange={(str) => {
							setItem({
								...item,
								email: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Página Web</Form.Label>
					<Form.Control
						placeholder='Página Web'
						onChange={(str) => {
							setItem({
								...item,
								pagina_web: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<h5>Datos Confidenciales</h5>

				<Form.Group controlId=''>
					<Form.Label>Nombre CEO</Form.Label>
					<Form.Control
						placeholder='Nombre CEO'
						onChange={(str) => {
							setItem({
								...item,
								nombre_ceo: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Correo CEO</Form.Label>
					<Form.Control
						placeholder='Correo CEO'
						onChange={(str) => {
							setItem({
								...item,
								email_ceo: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Razón Social</Form.Label>
					<Form.Control
						placeholder='Razón Social'
						onChange={(str) => {
							setItem({
								...item,
								razon_social: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Servicios</Form.Label>
					<Form.Control
						placeholder='Servicios'
						onChange={(str) => {
							setItem({
								...item,
								servicios: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Número de empleados en Nuevo León</Form.Label>
					<Form.Control
						placeholder='Número de empleados en Nuevo León'
						onChange={(str) => {
							setItem({
								...item,
								num_emp_nl: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Número de empleados en México</Form.Label>
					<Form.Control
						placeholder='Número de empleados en México'
						onChange={(str) => {
							setItem({
								...item,
								num_emp_mx: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Número de empleados fuera de México</Form.Label>
					<Form.Control
						placeholder='Número de empleados fuera de México'
						onChange={(str) => {
							setItem({
								...item,
								num_emp_nomx: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Redes Sociales</Form.Label>
					<Form.Control
						placeholder='Redes Sociales'
						onChange={(str) => {
							setItem({
								...item,
								redes_sociales: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Número de empleados en TI</Form.Label>
					<Form.Control
						placeholder='Número de empleados en TI'
						onChange={(str) => {
							setItem({
								...item,
								num_emp_ti: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>
						Número de empleados en Administración
					</Form.Label>
					<Form.Control
						placeholder='Número de empleados en Administración'
						onChange={(str) => {
							setItem({
								...item,
								num_emp_adm: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Porcentaje de ventas nacionales</Form.Label>
					<Form.Control
						placeholder='Porcentaje de ventas nacionales'
						onChange={(str) => {
							setItem({
								...item,
								porcentaje_ventas_nat: parseFloat(
									str.currentTarget.value
								),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>
						Porcentaje de ventas en el extranjero
					</Form.Label>
					<Form.Control
						placeholder='Porcentaje de ventas en el extranjero'
						onChange={(str) => {
							setItem({
								...item,
								porcentaje_ventas_ext: parseFloat(
									str.currentTarget.value
								),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>
						¿A qué países exporta principalmente?
					</Form.Label>
					<Form.Control
						placeholder='¿A qué países exporta principalmente?'
						onChange={(str) => {
							setItem({
								...item,
								paises_exp_princ: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>Número de ventas anuales</Form.Label>
					<Form.Control
						placeholder='Número de ventas anuales'
						onChange={(str) => {
							setItem({
								...item,
								ventas_anuales: parseFloat(
									str.currentTarget.value
								),
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>
						Certificaciones con las que cuenta la empresa
					</Form.Label>
					<Form.Control
						placeholder='Certificaciones con las que cuenta la empresa'
						onChange={(str) => {
							setItem({
								...item,
								certificaciones: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group>

				<Form.Group controlId=''>
					<Form.Label>
						Número de certificaciones con las que cuentan sus
						empleados
					</Form.Label>
					<Form.Control
						placeholder='Número de certificaciones con las que cuentan sus empleados'
						onChange={(str) => {
							setItem({
								...item,
								num_cert_emp: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group>

				<Button
					id='btn-submitForm'
					className='btn-submit'
					variant='primary'
					type='submit'
				>
					Guardar
				</Button>
			</Form>
		</div>
	);
};

export default FormEmpresa;
