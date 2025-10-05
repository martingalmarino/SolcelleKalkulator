# Solcelle Kalkulator 🇳🇴

Una calculadora de ROI para paneles solares en Noruega, construida con Next.js 14, TypeScript y TailwindCSS.

## 🌟 Características

- **Calculadora interactiva** para calcular ahorros y tiempo de retorno de inversión
- **Datos por fylke** con precios de electricidad y subsidios locales
- **Integración con PVGIS API** para datos de radiación solar
- **Páginas SEO optimizadas** para cada fylke de Noruega
- **Diseño Clean Tech** con colores azul cielo y verde
- **Responsive design** optimizado para móviles y desktop

## 🚀 Tecnologías

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **TailwindCSS** para estilos
- **PVGIS API** para datos solares
- **Vercel** para deployment

## 📦 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/solcelle-kalkulator.git
   cd solcelle-kalkulator
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno (opcional):**
   ```bash
   cp env.example .env.local
   # Edita .env.local con tus valores
   ```

4. **Ejecuta en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre [http://localhost:3000](http://localhost:3000) en tu navegador**

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── [fylke]/          # Páginas dinámicas por fylke
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página de inicio
├── components/
│   ├── Calculator.tsx    # Componente principal de la calculadora
│   └── ResultCard.tsx    # Tarjeta de resultados con CTA
└── lib/
    ├── calcROI.ts        # Lógica de cálculo de ROI
    ├── incentivesData.ts # Datos de subsidios por fylke
    ├── priceData.ts      # Precios de electricidad por fylke
    └── pvgisClient.ts    # Cliente para API de PVGIS
```

## 🎨 Diseño

El proyecto utiliza un esquema de colores **Clean Tech / Sky Blue**:

- **Primario:** `#1E88E5` (azul para CTAs y enlaces)
- **Primario Oscuro:** `#1565C0` (hover)
- **Secundario:** `#43A047` (para resultados positivos)
- **Fondo:** `#FFFFFF` (principal), `#F5F7FA` (secciones alternas)
- **Texto:** `#263238` (primario), `#546E7A` (secundario)
- **Fuente:** Inter (Google Font)

## 📊 Datos Incluidos

### Fylker Soportados
- Oslo, Viken, Vestland, Trøndelag, Rogaland, Agder
- Møre og Romsdal, Nordland, Troms og Finnmark
- Innlandet, Telemark

### Subsidios
- **Enova:** 7,500 NOK base + 1,250 NOK/kW (máximo 47,500 NOK)
- **Lokales:** Varían por fylke (2,000-5,000 NOK adicionales)

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración de Next.js

2. **Variables de entorno (opcional):**
   - Agrega las variables necesarias en el dashboard de Vercel
   - El proyecto funciona sin variables de entorno (usa valores por defecto)

### GitHub Pages

```bash
npm run build
npm run export
# Sube la carpeta 'out' a GitHub Pages
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecuta en modo desarrollo
- `npm run build` - Construye para producción
- `npm run start` - Ejecuta la versión de producción
- `npm run lint` - Ejecuta ESLint

## 📈 SEO

El proyecto incluye:
- **Meta tags optimizados** para cada página
- **Open Graph** para redes sociales
- **Páginas estáticas** generadas para cada fylke
- **URLs amigables** (ej: `/oslo`, `/vestland`)

## 🔮 Próximas Mejoras

- [ ] Integración con APIs de precios en tiempo real
- [ ] Formulario de contacto para instaladores
- [ ] Calculadora de baterías
- [ ] Mapa interactivo de instalaciones
- [ ] Blog con noticias sobre energía solar

## 📝 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

- **Proyecto:** [Solcelle Kalkulator](https://github.com/tu-usuario/solcelle-kalkulator)
- **Issues:** [GitHub Issues](https://github.com/tu-usuario/solcelle-kalkulator/issues)

---

**¡Construido con ❤️ para la transición energética de Noruega!** 🇳🇴☀️