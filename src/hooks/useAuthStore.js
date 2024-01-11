import { useDispatch, useSelector } from "react-redux"
import { onLogin, onChecking, onLogout, clearErrorMessage, messageWelcome, onRecovery } from "../store/auth";
import { inventoriesApi } from "../api";
import Swal from "sweetalert2";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async( { email, password }) =>{
        dispatch( onChecking () );
        try {
            const { data } = await inventoriesApi.post('auth/login', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( messageWelcome({name:data.name}));
            setTimeout(() => {
                dispatch( onLogin( {name:data.name, user: data.user} ) ) 
            }, 3000);
        } catch ( error ){
            dispatch( onLogout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async ({ complete_name_user, email, password, status = 0 }) =>{

        dispatch( onChecking() );
        try {
            const { data } = await inventoriesApi.post('auth/register', {complete_name_user, email, password, status });
            Swal.fire({
                title: 'Registro exitoso',
                html:(
                    `El usuario: <b>${data.email}</b> se ha registrado con éxito, hemos enviado un correo para la confirmación de su cuenta.`
                ),
                icon: 'success',
                width: 600,
                background: '#FFDDD url(../)',
                iconColor: '#237529',
                backdrop: `
                  rgba(216,234,180,94)
                  url("")
                  left top
                  no-repeat
                `,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInDown
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutUp
                    animate__faster
                  `
                },
                grow: 'row',
                showConfirmButton: false,
                showCloseButton: true,
                willClose: () => {
                    dispatch( onLogout());
                }
              })
        } catch ( error ){
            dispatch( onLogout( error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRecovery = async ({email}) => {
        dispatch( onChecking());
        try{
            const { data } = await inventoriesApi.post(`auth/recovery/${email}`);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario encontrado',
                text: `${data.msg}`,
                background: '#E8E6DB',
                showConfirmButton: false,
                timer: 8000
            })
            setTimeout(() => {
                dispatch( onRecovery())
            }, 8000);
        }catch( error ){
            dispatch( onLogout( error.response.data?.msg || 'Debe ingresar un correo para poder realizar una busqueda'));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startUpdatePassword = async ({id, password}) => {
        dispatch( onChecking());
        try{
            const { data } = await inventoriesApi.put(`auth/updatePassword/:${id}`,{password});
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Actualizado',
                text: `${data.msg}`,
                background: '#E8E6DB',
                showConfirmButton: false,
                timer: 8000
            }).then((result) => {
                console.log(result)
                if (result.isConfirmed || result.isDismissed) {
                    window.location.href = '/'
                }
              })
            console.log(data)
            setTimeout(() => {
                dispatch( onLogout())
            }, 8000);
        }catch( error ){
            dispatch( onLogout( error.response.data?.msg || 'No fué posible actualizar tus credenciales, favor de comunicarte con el administrador.'));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout() );

        try {
            const { data } = await inventoriesApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin( {name:data.name, user: data.user} ) ) 
        } catch ( error ){
            localStorage.clear();
            dispatch (onLogout());
        }

    }

    const startLogout = async() =>{
        Swal.fire({
            title: 'Salir',
            text: "¿Seguro que quieres cerrar tu sesión?",
            icon: 'question',
            showCancelButton: true,
            background: '#E8E6DB',
            confirmButtonColor: '#C5A366',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                dispatch(onLogout());
            }
          })
    }

    return {
        //*Propiedades

        status,
        user,
        errorMessage,

        //*Métodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout,
        startRecovery,
        startUpdatePassword
    }
}