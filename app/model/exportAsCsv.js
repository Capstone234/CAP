import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/**
 *
 * @param fileName local file to write map contents to
 * @param mapping mapping of column headings to values
 * @param vomsMapping
 * @param shareDialog dialog is share prompt on Android
 * @return {Promise<void>}
 */
const exportMapAsCsv = async (
  fileName,
  mapping,
  vomsMapping,
  npcDistance,
  shareDialog,
) => {
  if (!(await Sharing.isAvailableAsync())) {
    // eslint-disable-next-line no-alert
    alert(`Sharing files isn't available on your platform`);
    return;
  }

  // Write csv file using object
  const filePath = `${FileSystem.cacheDirectory}/${fileName}.csv`;

  let attributes = '';
  let values = '';
  let first = true;
  mapping.forEach((v, k) => {
    let sep = ',';
    if (first) {
      sep = '';
      first = false;
    }
    attributes = attributes.concat(sep, k);
    values = values.concat(sep, v);
  });

  let contents = ''.concat(attributes, '\n', values);

  //voms
  let vomsContents = '';

  vomsMapping.forEach((test) => {
    let desc = '';
    let ratings = '';
    let sep = ',';
    desc = desc.concat(
      test[0],
      sep,
      test[1],
      sep,
      test[3],
      sep,
      test[5],
      sep,
      test[7],
    );
    ratings = ratings.concat(
      sep,
      test[2],
      sep,
      test[4],
      sep,
      test[6],
      sep,
      test[8],
    );
    vomsContents = vomsContents.concat('\n', desc, '\n', ratings);
  });

  //voms end

  let totalContents = '';
  totalContents = totalContents.concat(contents, '\n', vomsContents);

  await FileSystem.writeAsStringAsync(filePath, totalContents);

  // Share file
  await Sharing.shareAsync(filePath, { dialogTitle: shareDialog });
};

export { exportMapAsCsv };
