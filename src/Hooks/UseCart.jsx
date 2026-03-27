import { useState, useEffect } from "react";
import {db} from "../data/db";

const useCart = () => {


    //Función para obtener el carrito desde el localStorage al cargar la aplicación. Si no hay un carrito guardado, se inicializa como un array vacío.
    const initialCart = () =>{
    const localStorageCart = localStorage.getItem("car");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
    
    const data = db;
  
    const [car,setCart] = useState(initialCart); 
    //Aquí useEffect se ejecuta después de cada renderizado del componente, y se encarga de guardar el estado actual del carrito en el localStorage cada vez que el carrito cambia. Esto asegura que el carrito se mantenga actualizado en el localStorage y se pueda recuperar correctamente al recargar la página.
    useEffect(() => {
        localStorage.setItem("car", JSON.stringify(car));
    }, [car])



    function AddToCart(item){
        const itemExist = car.findIndex(carro => carro.id === item.id);

        if(itemExist >= 0){
        //Aquí creamos una copia del carrito con ...car, y luego actualizamos la cantidad del producto existente utilizando itemExist para acceder al índice del producto en el carrito y luego incrementamos su cantidad.
        const updatedCart = [...car];
        updatedCart[itemExist].quantity++;//Aquí incrementamos la cantidad del producto existente en el carrito utilizando el índice encontrado con itemExist.
        setCart(updatedCart);
        }else{
        //quantity es para que el producto tenga una cantidad (osea cuente cuantos pedidos del mismo producto quiere), ya que si se agrega el mismo producto al carrito, se incrementará la cantidad en lugar de agregar otro producto.
        item.quantity = 1;
        //Aqí creamos una copia de los productos con ...car y el item es para que agregue otro producto al carrito
        setCart([...car,item]);
        }
            
    }
    function removeFromCar(idCarro){
        //console.log(`Se eliminara el id... ${idCarro}`);
        //Aquí se eliminará el producto del carrito utilizando el método filter para crear un nuevo array sin el producto que se desea eliminar.
        //Osea de cargara de nuevo el array sin el producto eliminado.
        setCart(preCar => preCar.filter(carro => carro.id !== idCarro));
    }
    function decreaseQuantity(idCarro){
        const itemExist = car.map(carro => {
        if(carro.id === idCarro && carro.quantity > 1){
            //Aquí creamos una copia del carrito con ...car, y luego actualizamos la cantidad del producto existente utilizando itemExist para acceder al índice del producto en el carrito y luego decrementamos su cantidad.
            return {...carro,
                    quantity: carro.quantity - 1
                };
        }
        return carro; // Retorna el producto sin cambios si no coincide con el idCarro
        })

        //Aquí se actualiza el carrito con el nuevo array que contiene la cantidad decrementada del producto seleccionado.
        setCart(itemExist);   

    }
    function incremenQuantity(idCarro){
        const itemExist = car.map(carro => {
        if(carro.id === idCarro){
            //Aquí creamos una copia del carrito con ...car, y luego actualizamos la cantidad del producto existente utilizando itemExist para acceder al índice del producto en el carrito y luego incrementamos su cantidad.
            return {...carro,
                    quantity: carro.quantity + 1
                };
        }
        return carro; // Retorna el producto sin cambios si no coincide con el idCarro
        })

        //Aquí se actualiza el carrito con el nuevo array que contiene la cantidad incrementada del producto seleccionado.
        setCart(itemExist);

    }
    function clearCart(){
        setCart([]);
    }

    const cartTotal = car.reduce((total, {quantity,price}) => { return total + (quantity * price)}, 0);

    return{
        data,
        car,
        AddToCart,
        removeFromCar,
        decreaseQuantity,
        incremenQuantity,
        clearCart,
        cartTotal

    }

}

export {useCart}


