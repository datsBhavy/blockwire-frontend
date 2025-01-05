import { RocketFlightPathLandscape, 
    RocketSpacePortrait, 
    RocketTakeoffLandscape, 
    RocketTakeoffLandscape1, 
    SpaceShipVentsSquare, 
    SpinningLightsPortrait, 
    SunsetRocketLanding, 
    WeirdGalaxyPortrait, 
    WideMoonLandscape, 
    Abstract, 
    Andromeda, 
    AstronautPortrait, 
    DesertCreviceLandscape, 
    LunarEclipseLandscape, 
    NorthernLightsSquare, 
    RedBlueGalaxy, 
    RedMoodLandscape,
    Headshot1,
    Headshot2,
    Headshot3,
    Headshot4,
    Headshot5,
    Headshot6,
    Headshot7,
    Headshot8
 } from "./images";

export function mapToColumns(blogs: Record<string, any>[], numColumns = 3) {
    // Initialize empty arrays for the columns
    const columns = Array.from({ length: numColumns }, () => []);
  
    // Iterate through the blogs and distribute them into the columns
    blogs.forEach((blog, index) => {
      const columnIndex = index % numColumns; // Determine the column index
      columns[columnIndex].push(blog); // Add the blog to the appropriate column
    });
  
    return columns;
  }
  
  export function mapToColumnsWithHeights(data, columnHeights) {
    const columns = columnHeights.map(() => []); // Initialize an empty array for each column
    let blogIndex = 0; // Index to track the current blog being assigned
  
    while (blogIndex < data.length) {
      for (let columnIndex = 0; columnIndex < columnHeights.length; columnIndex++) {
        const height = columnHeights[columnIndex].shift(); // Get the next height for this column
        if (height) {
          // Assign the height and push the blog into the corresponding column
          columns[columnIndex].push({
            ...data[blogIndex],
            containerHeight: height,
          });
          blogIndex++; // Move to the next blog
          if (blogIndex >= data.length) break; // Stop if all blogs are assigned
        }
      }
    }
  
    return columns;
  }

  export function getRandomImage() {
    const randomImages = [
      RocketFlightPathLandscape,
      RocketSpacePortrait,
      RocketTakeoffLandscape,
      RocketTakeoffLandscape1,
      SpaceShipVentsSquare,
      SpinningLightsPortrait,
      SunsetRocketLanding,
      WeirdGalaxyPortrait,
      WideMoonLandscape,
      Abstract,
      Andromeda,
      AstronautPortrait,
      DesertCreviceLandscape,
      LunarEclipseLandscape,
      NorthernLightsSquare,
      RedBlueGalaxy,
      RedMoodLandscape,
    ];
  
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  export function getRandomHeadshot() {
    const randomHeadshots = [
      Headshot1,
      Headshot2,
      Headshot3,
      Headshot4,
      Headshot5,
      Headshot6,
      Headshot7,
      Headshot8
    ]
    return randomHeadshots[Math.floor(Math.random() * randomHeadshots.length)];

  }