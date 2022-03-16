import {
  FiLayers,
  FiSlash,
  FiWind,
  FiFeather,
  FiSliders,
} from 'react-icons/fi';
import { SiTypescript } from 'react-icons/si';

const feats = [
  {
    name: 'Headless',
    icon: FiWind,
  },
  {
    name: '100% TypeScript',
    icon: SiTypescript,
  },
  {
    name: 'No dependencies',
    icon: FiSlash,
  },
  {
    name: '100% customizable',
    icon: FiLayers,
  },
  {
    name: 'Lightweight',
    icon: FiFeather,
  },
  {
    name: 'composable',
    icon: FiSliders,
  },
];

const Features = () => {
  return (
    <div className="grid grid-cols-2 gap-6 my-10 sm:grid-cols-2">
      {feats.map(({ icon: Icon, ...feat }) => {
        return (
          <div
            key={feat?.name.split(' ').join('-')}
            className="flex items-center space-x-4"
          >
            <div>
              <Icon
                className="block w-8 h-8"
                style={{ height: 24, width: 24 }}
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="my-0 font-medium dark:text-white">
                {feat?.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Features;
