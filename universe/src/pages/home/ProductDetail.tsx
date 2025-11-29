import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import type { Producto } from '../../services/ecommerce/productos.services'
import { productosService } from '../../services/ecommerce/productos.services'

interface LocationState {
  producto?: Producto
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const stateProducto = (location.state as LocationState | null)?.producto

  const [producto, setProducto] = useState<Producto | null>(stateProducto ?? null)
  const [loading, setLoading] = useState(!stateProducto)
  const [error, setError] = useState<string | null>(null)

  const productId = useMemo(() => (id ? Number(id) : null), [id])

  useEffect(() => {
    if (!productId || stateProducto) return

    const fetchProducto = async () => {
      try {
        setLoading(true)
        const data = await productosService.obtenerProductoPorId(productId)
        setProducto(data)
        setError(null)
      } catch {
        setError('No se pudo cargar el producto seleccionado.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducto()
  }, [productId, stateProducto])

  if (!productId) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">El identificador del producto es inválido.</div>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← Volver
        </Link>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando información del producto...</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && producto && (
        <div className="row g-4 align-items-start">
          <div className="col-md-6">
            <div className="card shadow-sm">
              {producto.imagen ? (
                <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              ) : (
                <div className="card-body text-center text-muted">Sin imagen disponible</div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <span className="badge bg-primary text-capitalize mb-3">
                  {producto.categoria || 'Sin categoría'}
                </span>
                <h2 className="card-title">{producto.nombre}</h2>
                <p className="text-muted">{producto.descripcion}</p>

                <div className="d-flex gap-3 my-4">
                  <div>
                    <small className="text-muted d-block">Precio</small>
                    <strong className="text-primary fs-4">${producto.precio.toFixed(2)}</strong>
                  </div>
                  <div>
                    <small className="text-muted d-block">Disponibilidad</small>
                    <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                      {producto.stock > 0 ? `${producto.stock} en stock` : 'Agotado'}
                    </span>
                  </div>
                </div>

                <button className="btn btn-primary" disabled={producto.stock === 0}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
