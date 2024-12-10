const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;


  const recommendedProducts = products
    .map((product) => {
    
      const preferenceMatches = product.preferences.filter((preference) =>
        selectedPreferences?.includes(preference)
      ).length ?? 0;

    
      const featureMatches = product.features?.filter((feature) =>
        selectedFeatures?.includes(feature)
      ).length ?? 0;

    
      const matchScore = preferenceMatches + featureMatches;

      return { ...product, matchScore };
    })
    .filter((product) => product.matchScore > 0)
    .sort((a, b) => {
    
      if (b.matchScore === a.matchScore) {
        return b.id - a.id;
      }
      return b.matchScore - a.matchScore;
    });

  const selectedSingleProduct = selectedRecommendationType === 'SingleProduct';

  return selectedSingleProduct ? [recommendedProducts[0]] : recommendedProducts;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getRecommendations };
