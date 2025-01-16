import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
// import { Wrapper } from "@googlemaps/react-wrapper";

// interface MapProps extends Exclude<google.maps.MapOptions, "center"> {
//   setMap?: Dispatch<SetStateAction<google.maps.Map | undefined>>;
//   center?: google.maps.LatLngLiteral;
//   onDragStart?: Function;
// }

// Определяем тип для состояния карты  
interface MapState {
  center: [number, number]; // Координаты центра  
  zoom: number; // Уровень зума  
}

const MapComponent: React.FC = () => {
  const mapState: MapState = {
    center: [53.87, 25.44],
    zoom: 8,
  };

  // Указываем координаты для маркеров  
  const markers = [
    { id: 400, coordinates: [53.678871, 23.845091], hint: 'Marker 1', balloon: 'This is Marker 1' },
    { id: 401, coordinates: [53.594826, 24.249904], hint: 'Marker 2', balloon: 'This is Marker 2' },
    { id: 410, coordinates: [53.160950, 24.458089], hint: 'Marker 3', balloon: 'This is Marker 3' },
    { id: 411, coordinates: [53.191282, 24.017555], hint: 'Marker 4', balloon: 'This is Marker 4' },
    { id: 412, coordinates: [53.415847, 24.543734], hint: 'Marker 5', balloon: 'This is Marker 5' },
    { id: 413, coordinates: [53.038448, 24.091549], hint: 'Marker 6', balloon: 'This is Marker 6' },
    { id: 420, coordinates: [53.884699, 25.301212], hint: 'Marker 7', balloon: 'This is Marker 7' },
    { id: 421, coordinates: [54.150969, 25.320409], hint: 'Marker 8', balloon: 'This is Marker 8' },
    { id: 422, coordinates: [53.601255, 24.741669], hint: 'Marker 9', balloon: 'This is Marker 9' },
    { id: 430, coordinates: [53.595184, 25.822279], hint: 'Marker 10', balloon: 'This is Marker 10' },
    { id: 431, coordinates: [53.569461, 26.140930], hint: 'Marker 11', balloon: 'This is Marker 11' },
    { id: 440, coordinates: [54.423314, 25.937641], hint: 'Marker 12', balloon: 'This is Marker 12' },
    { id: 441, coordinates: [53.941230, 25.760628], hint: 'Marker 13', balloon: 'This is Marker 13' },
    { id: 442, coordinates: [54.610089, 25.978811], hint: 'Marker 14', balloon: 'This is Marker 14' },
    { id: 443, coordinates: [54.479780, 26.401774], hint: 'Marker 15', balloon: 'This is Marker 15' },
    { id: 450, coordinates: [53.093386, 25.319160], hint: 'Marker 16', balloon: 'This is Marker 16' },
    { id: 451, coordinates: [53.147455, 24.812492], hint: 'Marker 17', balloon: 'This is Marker 17' },
    { id: 452, coordinates: [53.467128, 25.409611], hint: 'Marker 18', balloon: 'This is Marker 18' },
  ];

  const images = [...Array(26)].map(() => {
    const letter = markers.map((marker) => marker.id);
    return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
  });

  return (
    <YMaps>
      <Map state={mapState} style={{ width: '100%', height: '550px' }}>
        {/* <Placemark
          geometry={[53.678871, 23.845091]}
          properties={{
            hintContent: 'Москва!',
            balloonContent: 'Это столица России.',
          }}
        /> */}
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {markers.map((marker) => (
            <Placemark
              key={marker.id}
              geometry={marker.coordinates}
              properties={{
                hintContent: marker.hint,
                balloonContent: marker.balloon,
                iconContent: marker.id, // Добавляем текст для отображения  
              }}
              options={{
                preset: 'islands#icon', // Используем стандартный чёрный икон  
                //iconLayout: 'default#imageWithContent',
                //iconImageHref: 'https://img.icons8.com/?size=100&id=OBmVbH2qOGwK&format=png&color=000000', // Путь к вашему изображению маркера  
                iconColor: '#1E90FF',
                iconImageSize: [40, 40], // Увеличенные размеры иконки  
                iconImageOffset: [-15, -42], // Смещение изображения  
                iconContentOffset: [15, 15], // Смещение текста  
              }}
            />
          ))}
        </Clusterer>
      </Map>
    </YMaps>
  )
}
export default MapComponent
