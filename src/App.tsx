import { lazy, Suspense } from '@lynx-js/react'

const Component = lazy(() => import('./lazy/component.js'));

export function App() {
  return (
    <view>
      <Suspense>
        <Component></Component>
      </Suspense>
    </view>
  );
}
