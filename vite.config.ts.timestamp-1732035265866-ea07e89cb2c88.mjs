// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/winsontsang/Developer/minidapp/block-v3/node_modules/vite/dist/node/index.js";
import react from "file:///Users/winsontsang/Developer/minidapp/block-v3/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { createHtmlPlugin } from "file:///Users/winsontsang/Developer/minidapp/block-v3/node_modules/vite-plugin-html/dist/index.mjs";
import legacy from "file:///Users/winsontsang/Developer/minidapp/block-v3/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { TanStackRouterVite } from "file:///Users/winsontsang/Developer/minidapp/block-v3/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
var vite_config_default = ({ mode }) => {
  let devEnv = "";
  const env = Object.assign(
    globalThis.process.env,
    loadEnv(mode, globalThis.process.cwd())
  );
  if (mode === "development") {
    devEnv = `
      <script>
        var DEBUG = "${env.VITE_DEBUG}" === 'true';
        var DEBUG_HOST = "${env.VITE_DEBUG_HOST}";
        var DEBUG_PORT = "${env.VITE_DEBUG_MDS_PORT}";
        var DEBUG_UID = "${env.VITE_DEBUG_UID}";
      </script>
    `;
  }
  return defineConfig({
    base: "",
    build: {
      target: "esnext",
      outDir: "build"
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext"
      }
    },
    plugins: [
      TanStackRouterVite(),
      react(),
      legacy({
        renderLegacyChunks: false,
        targets: ["defaults", "not IE 11", "Android >= 9"]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            devEnv
          }
        }
      })
    ]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2luc29udHNhbmcvRGV2ZWxvcGVyL21pbmlkYXBwL2Jsb2NrLXYzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvd2luc29udHNhbmcvRGV2ZWxvcGVyL21pbmlkYXBwL2Jsb2NrLXYzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy93aW5zb250c2FuZy9EZXZlbG9wZXIvbWluaWRhcHAvYmxvY2stdjMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJ1xuaW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tICdAdGFuc3RhY2svcm91dGVyLXBsdWdpbi92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgbGV0IGRldkVudiA9ICcnXG4gIGNvbnN0IGVudiA9IE9iamVjdC5hc3NpZ24oXG4gICAgZ2xvYmFsVGhpcy5wcm9jZXNzLmVudixcbiAgICBsb2FkRW52KG1vZGUsIGdsb2JhbFRoaXMucHJvY2Vzcy5jd2QoKSlcbiAgKVxuXG4gIGlmIChtb2RlID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgZGV2RW52ID0gYFxuICAgICAgPHNjcmlwdD5cbiAgICAgICAgdmFyIERFQlVHID0gXCIke2Vudi5WSVRFX0RFQlVHfVwiID09PSAndHJ1ZSc7XG4gICAgICAgIHZhciBERUJVR19IT1NUID0gXCIke2Vudi5WSVRFX0RFQlVHX0hPU1R9XCI7XG4gICAgICAgIHZhciBERUJVR19QT1JUID0gXCIke2Vudi5WSVRFX0RFQlVHX01EU19QT1JUfVwiO1xuICAgICAgICB2YXIgREVCVUdfVUlEID0gXCIke2Vudi5WSVRFX0RFQlVHX1VJRH1cIjtcbiAgICAgIDwvc2NyaXB0PlxuICAgIGBcbiAgfVxuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6ICcnLFxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgICAgb3V0RGlyOiAnYnVpbGQnLFxuICAgIH0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFRhblN0YWNrUm91dGVyVml0ZSgpLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIGxlZ2FjeSh7XG4gICAgICAgIHJlbmRlckxlZ2FjeUNodW5rczogZmFsc2UsXG4gICAgICAgIHRhcmdldHM6IFsnZGVmYXVsdHMnLCAnbm90IElFIDExJywgJ0FuZHJvaWQgPj0gOSddLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgaW5qZWN0OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGV2RW52LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdLFxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLGNBQWMsZUFBZTtBQUNsVyxPQUFPLFdBQVc7QUFDbEIsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxZQUFZO0FBQ25CLFNBQVMsMEJBQTBCO0FBRW5DLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUMzQixNQUFJLFNBQVM7QUFDYixRQUFNLE1BQU0sT0FBTztBQUFBLElBQ2pCLFdBQVcsUUFBUTtBQUFBLElBQ25CLFFBQVEsTUFBTSxXQUFXLFFBQVEsSUFBSSxDQUFDO0FBQUEsRUFDeEM7QUFFQSxNQUFJLFNBQVMsZUFBZTtBQUMxQixhQUFTO0FBQUE7QUFBQSx1QkFFVSxJQUFJLFVBQVU7QUFBQSw0QkFDVCxJQUFJLGVBQWU7QUFBQSw0QkFDbkIsSUFBSSxtQkFBbUI7QUFBQSwyQkFDeEIsSUFBSSxjQUFjO0FBQUE7QUFBQTtBQUFBLEVBRzNDO0FBRUEsU0FBTyxhQUFhO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLGdCQUFnQjtBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxtQkFBbUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxvQkFBb0I7QUFBQSxRQUNwQixTQUFTLENBQUMsWUFBWSxhQUFhLGNBQWM7QUFBQSxNQUNuRCxDQUFDO0FBQUEsTUFDRCxpQkFBaUI7QUFBQSxRQUNmLFFBQVE7QUFBQSxVQUNOLE1BQU07QUFBQSxZQUNKO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
