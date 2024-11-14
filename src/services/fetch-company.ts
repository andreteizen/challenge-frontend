import { AssetNode, LocationNode, TreeNode } from '@/types/tree';

/**
 * Fetches and constructs a hierarchical tree structure of company data,
 * including assets and locations, based on the provided company ID.
 *
 * @param companyId - The unique identifier of the company whose data is to be fetched.
 * @returns A promise that resolves to an array of TreeNode objects representing
 * the hierarchical structure of the company's assets and locations.
 * @throws Will throw an error if the data fetching fails.
 */
export const fetchCompanyData = async (
  companyId: string
): Promise<TreeNode[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_TRACTIAN_API;
    const [assetsResponse, locationsResponse] = await Promise.all([
      fetch(`${baseUrl}/companies/${companyId}/assets`),
      fetch(`${baseUrl}/companies/${companyId}/locations`),
    ]);

    if (!assetsResponse.ok || !locationsResponse.ok) {
      throw new Error('Failed to fetch company data');
    }

    const [assetsData, locationsData] = await Promise.all([
      assetsResponse.json(),
      locationsResponse.json(),
    ]);

    const locationsMap = new Map<string, LocationNode>();
    const assetsMap = new Map<string, AssetNode>();

    locationsData.forEach((location: any) => {
      locationsMap.set(location.id, {
        ...location,
        type: 'location',
        children: [],
      });
    });

    assetsData.forEach((asset: any) => {
      assetsMap.set(asset.id, { ...asset, type: 'asset', children: [] });
    });

    const root: TreeNode[] = [];

    locationsMap.forEach((item) => {
      if (item.parentId) {
        const parent = locationsMap.get(item.parentId);
        if (parent) parent.children.push(item);
      } else {
        root.push(item);
      }
    });

    assetsMap.forEach((item) => {
      if (!item.locationId && !item.parentId) {
        root.push(item);
      } else if (item.locationId) {
        const parent = locationsMap.get(item.locationId);
        if (parent) parent.children.push(item);
      } else if (item.parentId) {
        const parent = assetsMap.get(item.parentId);
        if (parent) parent.children.push(item);
      }
    });

    return root;
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw error;
  }
};
