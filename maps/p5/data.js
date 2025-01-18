const vocab = {
    type: ['ARC', 'ZÁRKA'],
}; 

const colors = {
    "white": "#cccccc",
    "blue": "#7a97c6",
    "red": "#e2685e",
    "green": "#80beb2",
    "yellow": "#fae272",
}

const paths = {
    Z101: ["BA111", "BA107", "BA102", "BA35", "BA33", "BA23", "BA16"],
    K115: ["BA228", "BA211", "BA207", "BA202", "BA35", "BA33", "BA12"],
    S120: ["BA37", "BA19", "BA23", "BA33", "BA35", "BA102", "BA103"],
}

const nodes = [
    { type: 0, id: 'BA9', coords: [108.64, 1.6, 386.6] },
    { type: 0, id: 'BA8', coords: [108.78, 1.6, 387.12] },
    { type: 0, id: 'BA7', coords: [108.64, 1.6, 387.12] },
    { type: 0, id: 'BA6', coords: [92.78, 1.6, 387.01] },
    { type: 0, id: 'BA5', coords: [91.83, 1.6, 387.01] },
    { type: 0, id: 'BA4', coords: [90.72, 1.6, 388.95] },
    { type: 0, id: 'BA38', coords: [122.19, 1.6, 387.5] },
    { type: 0, id: 'BA37', coords: [122.06, 1.6, 364.52] },
    { type: 0, id: 'BA36', coords: [122.06, 1.6, 364.67] },
    { type: 0, id: 'BA35', coords: [141.68, 1.6, 388.34] },
    { type: 0, id: 'BA34', coords: [141.68, 1.6, 388.04] },
    { type: 0, id: 'BA330', coords: [121.12, 11.83, 397.41] },
    { type: 0, id: 'BA33', coords: [134.44, 1.6, 386.75] },
    { type: 0, id: 'BA329', coords: [121, 11.83, 397.51] },
    { type: 0, id: 'BA328', coords: [120.85, 11.83, 397.49] },
    { type: 0, id: 'BA327', coords: [120.74, 11.83, 397.39] },
    { type: 0, id: 'BA326', coords: [120.98, 11.83, 396.19] },
    { type: 0, id: 'BA325', coords: [120.83, 11.83, 396.19] },
    { type: 0, id: 'BA324', coords: [108.64, 11.83, 387.11] },
    { type: 0, id: 'BA323', coords: [108.78, 11.83, 387.11] },
    { type: 0, id: 'BA322', coords: [108.64, 11.83, 386.63] },
    { type: 0, id: 'BA321', coords: [108.78, 11.83, 386.63] },
    { type: 0, id: 'BA320', coords: [110.77, 11.83, 386.92] },
    { type: 0, id: 'BA32', coords: [133.87, 1.6, 388.04] },
    { type: 0, id: 'BA319', coords: [110.77, 11.83, 386.77] },
    { type: 0, id: 'BA318', coords: [120.61, 11.83, 374.55] },
    { type: 0, id: 'BA317', coords: [120.61, 11.83, 374.7] },
    { type: 0, id: 'BA316', coords: [121.2, 11.83, 374.55] },
    { type: 0, id: 'BA315', coords: [121.2, 11.83, 374.7] },
    { type: 0, id: 'BA314', coords: [120.81, 11.83, 376.69] },
    { type: 0, id: 'BA313', coords: [120.96, 11.83, 376.69] },
    { type: 0, id: 'BA312', coords: [122.21, 11.83, 387.49] },
    { type: 0, id: 'BA311', coords: [130.47, 11.83, 388.16] },
    { type: 0, id: 'BA310', coords: [130.47, 11.83, 388.06] },
    { type: 0, id: 'BA31', coords: [133.02, 1.6, 388.24] },
    { type: 0, id: 'BA309', coords: [130.46, 11.83, 385.49] },
    { type: 0, id: 'BA308', coords: [130.46, 11.83, 385.59] },
    { type: 0, id: 'BA307', coords: [133.2, 11.83, 386.75] },
    { type: 0, id: 'BA306', coords: [133.02, 11.83, 388.24] },
    { type: 0, id: 'BA305', coords: [133.87, 11.83, 388.04] },
    { type: 0, id: 'BA304', coords: [134.44, 11.83, 386.75] },
    { type: 0, id: 'BA303', coords: [136, 11.83, 385.63] },
    { type: 0, id: 'BA302', coords: [141.68, 11.83, 388.04] },
    { type: 0, id: 'BA301', coords: [141.68, 11.83, 388.34] },
    { type: 0, id: 'BA30', coords: [133.2, 1.6, 386.75] },
    { type: 0, id: 'BA3', coords: [90.65, 1.6, 388.55] },
    { type: 0, id: 'BA29', coords: [134.73, 1.6, 391.19] },
    { type: 0, id: 'BA28', coords: [133.72, 1.6, 390.18] },
    { type: 0, id: 'BA27', coords: [121.05, 1.6, 397.54] },
    { type: 0, id: 'BA26', coords: [120.9, 1.6, 397.54] },
    { type: 0, id: 'BA25', coords: [120.79, 1.6, 397.44] },
    { type: 0, id: 'BA24', coords: [121.15, 1.6, 397.44] },
    { type: 0, id: 'BA230', coords: [120.61, 8.53, 374.55] },
    { type: 0, id: 'BA23', coords: [126.18, 1.6, 385.64] },
    { type: 0, id: 'BA229', coords: [120.61, 8.53, 374.7] },
    { type: 0, id: 'BA228', coords: [121.2, 8.53, 374.55] },
    { type: 0, id: 'BA227', coords: [121.2, 8.53, 374.7] },
    { type: 0, id: 'BA226', coords: [120.99, 8.53, 376.55] },
    { type: 0, id: 'BA225', coords: [120.84, 8.53, 376.55] },
    { type: 0, id: 'BA224', coords: [108.64, 8.53, 387.11] },
    { type: 0, id: 'BA223', coords: [108.78, 8.53, 387.11] },
    { type: 0, id: 'BA222', coords: [108.64, 8.53, 386.63] },
    { type: 0, id: 'BA221', coords: [108.78, 8.53, 386.63] },
    { type: 0, id: 'BA220', coords: [109.5, 8.53, 386.75] },
    { type: 0, id: 'BA22', coords: [126.18, 1.6, 385.48] },
    { type: 0, id: 'BA219', coords: [109.5, 8.53, 386.9] },
    { type: 0, id: 'BA218', coords: [121.12, 8.53, 397.41] },
    { type: 0, id: 'BA217', coords: [121, 8.53, 397.51] },
    { type: 0, id: 'BA216', coords: [120.85, 8.53, 397.49] },
    { type: 0, id: 'BA215', coords: [120.74, 8.53, 397.39] },
    { type: 0, id: 'BA214', coords: [120.82, 8.53, 395.7] },
    { type: 0, id: 'BA213', coords: [120.97, 8.53, 395.7] },
    { type: 0, id: 'BA212', coords: [122.21, 8.53, 387.52] },
    { type: 0, id: 'BA211', coords: [131, 8.53, 385.17] },
    { type: 0, id: 'BA210', coords: [131.12, 8.53, 385.29] },
    { type: 0, id: 'BA21', coords: [129.87, 1.6, 381.92] },
    { type: 0, id: 'BA209', coords: [131.02, 8.53, 388.52] },
    { type: 0, id: 'BA208', coords: [131.12, 8.53, 388.41] },
    { type: 0, id: 'BA207', coords: [133.2, 8.53, 386.75] },
    { type: 0, id: 'BA206', coords: [133.02, 8.53, 388.24] },
    { type: 0, id: 'BA205', coords: [133.87, 8.53, 388.04] },
    { type: 0, id: 'BA204', coords: [134.44, 8.53, 386.75] },
    { type: 0, id: 'BA203', coords: [136, 8.53, 385.63] },
    { type: 0, id: 'BA202', coords: [141.68, 8.53, 388.04] },
    { type: 0, id: 'BA201', coords: [141.68, 8.53, 388.34] },
    { type: 0, id: 'BA20', coords: [125.09, 1.6, 377.12] },
    { type: 0, id: 'BA2', coords: [86.05, 1.6, 388.55] },
    { type: 0, id: 'BA17', coords: [118.25, 1.6, 375.67] },
    { type: 0, id: 'BA16', coords: [114.01, 1.6, 379.88] },
    { type: 0, id: 'BA15', coords: [116.54, 1.6, 386.76] },
    { type: 0, id: 'BA14', coords: [116.54, 1.6, 386.91] },
    { type: 0, id: 'BA130', coords: [121.12, 5.23, 397.41] },
    { type: 0, id: 'BA13', coords: [109.77, 1.6, 393.93] },
    { type: 0, id: 'BA129', coords: [121, 5.23, 397.51] },
    { type: 0, id: 'BA128', coords: [120.85, 5.23, 397.49] },
    { type: 0, id: 'BA127', coords: [120.74, 5.23, 397.39] },
    { type: 0, id: 'BA126', coords: [120.85, 5.23, 396.19] },
    { type: 0, id: 'BA125', coords: [120.85, 5.23, 396.19] },
    { type: 0, id: 'BA124', coords: [108.64, 5.23, 387.11] },
    { type: 0, id: 'BA123', coords: [108.78, 5.23, 387.11] },
    { type: 0, id: 'BA122', coords: [108.64, 5.23, 386.63] },
    { type: 0, id: 'BA121', coords: [108.78, 5.23, 386.63] },
    { type: 0, id: 'BA120', coords: [112.89, 5.23, 386.92] },
    { type: 0, id: 'BA12', coords: [110.88, 1.6, 392.81] },
    { type: 0, id: 'BA119', coords: [112.89, 5.23, 386.77] },
    { type: 0, id: 'BA118', coords: [120.61, 5.23, 374.55] },
    { type: 0, id: 'BA117', coords: [120.61, 5.23, 374.7] },
    { type: 0, id: 'BA116', coords: [121.2, 5.23, 374.55] },
    { type: 0, id: 'BA115', coords: [121.2, 5.23, 374.7] },
    { type: 0, id: 'BA114', coords: [120.83, 5.23, 377.47] },
    { type: 0, id: 'BA113', coords: [120.98, 5.23, 377.47] },
    { type: 0, id: 'BA112', coords: [122.21, 5.23, 386.2] },
    { type: 0, id: 'BA111', coords: [130.33, 5.23, 385.52] },
    { type: 0, id: 'BA110', coords: [130.33, 5.23, 385.62] },
    { type: 0, id: 'BA109', coords: [130.33, 5.23, 388.09] },
    { type: 0, id: 'BA108', coords: [130.33, 5.23, 387.99] },
    { type: 0, id: 'BA107', coords: [133.2, 5.23, 386.75] },
    { type: 0, id: 'BA106', coords: [133.02, 5.23, 388.24] },
    { type: 0, id: 'BA105', coords: [133.87, 5.23, 388.04] },
    { type: 0, id: 'BA104', coords: [134.44, 5.23, 386.75] },
    { type: 0, id: 'BA103', coords: [136, 5.23, 385.63] },
    { type: 0, id: 'BA102', coords: [141.68, 5.23, 388.04] },
    { type: 0, id: 'BA101', coords: [141.68, 5.23, 388.34] },
    { type: 0, id: 'BA10', coords: [108.78, 1.6, 386.6] },
    { type: 0, id: 'BA1', coords: [85.02, 1.6, 388.68] },
    { type: 1, id: 'S101', coords: [120.06, 0.75, 407.34] },
    { type: 1, id: 'S102', coords: [120.06, 0.75, 408.76] },
    { type: 1, id: 'S103', coords: [120.06, 0.75, 419.35] },
    { type: 1, id: 'S104', coords: [120.06, 0.75, 420.77] },
    { type: 1, id: 'S105', coords: [120.06, 0.75, 430.46] },
    { type: 1, id: 'S106', coords: [121.9, 0.75, 430.46] },
    { type: 1, id: 'S107', coords: [121.9, 0.75, 420.77] },
    { type: 1, id: 'S108', coords: [121.9, 0.75, 419.39] },
    { type: 1, id: 'S109', coords: [121.9, 0.75, 408.78] },
    { type: 1, id: 'S110', coords: [121.9, 0.75, 407.39] },
    { type: 1, id: 'S111', coords: [123.24, 0.75, 398.36] },
    { type: 1, id: 'S112', coords: [129.93, 0.75, 391.68] },
    { type: 1, id: 'S113', coords: [122.56, 0.75, 362.49] },
    { type: 1, id: 'S114', coords: [122.56, 0.75, 357.08] },
    { type: 1, id: 'S115', coords: [122.56, 0.75, 352.07] },
    { type: 1, id: 'S116', coords: [122.56, 0.75, 346.69] },
    { type: 1, id: 'S117', coords: [119.27, 0.75, 346.69] },
    { type: 1, id: 'S118', coords: [119.27, 0.75, 352.08] },
    { type: 1, id: 'S119', coords: [119.27, 0.75, 357.06] },
    { type: 1, id: 'S120', coords: [119.27, 0.75, 362.48] },
    { type: 1, id: 'Z101', coords: [131.1, 4.38, 383.15] },
    { type: 1, id: 'Z102', coords: [128.25, 4.38, 380.32] },
    { type: 1, id: 'Z103', coords: [127.26, 4.38, 379.35] },
    { type: 1, id: 'Z104', coords: [124.45, 4.38, 376.49] },
    { type: 1, id: 'Z105', coords: [122.61, 4.38, 370.9] },
    { type: 1, id: 'Z106', coords: [122.61, 4.38, 366.9] },
    { type: 1, id: 'Z107', coords: [122.61, 4.38, 365.48] },
    { type: 1, id: 'Z108', coords: [122.61, 4.38, 361.5] },
    { type: 1, id: 'Z109', coords: [122.61, 4.38, 360.1] },
    { type: 1, id: 'Z110', coords: [122.61, 4.38, 356.1] },
    { type: 1, id: 'Z111', coords: [122.61, 4.38, 354.7] },
    { type: 1, id: 'Z112', coords: [122.61, 4.38, 350.7] },
    { type: 1, id: 'Z113', coords: [122.61, 4.38, 349.3] },
    { type: 1, id: 'Z114', coords: [122.61, 4.38, 345.3] },
    { type: 1, id: 'Z115', coords: [122.61, 4.38, 343.87] },
    { type: 1, id: 'Z116', coords: [122.61, 4.38, 339.9] },
    { type: 1, id: 'Z117', coords: [119.15, 4.38, 339.9] },
    { type: 1, id: 'Z118', coords: [119.15, 4.38, 343.89] },
    { type: 1, id: 'Z119', coords: [119.15, 4.38, 345.29] },
    { type: 1, id: 'Z120', coords: [119.15, 4.38, 349.29] },
    { type: 1, id: 'Z121', coords: [119.15, 4.38, 350.69] },
    { type: 1, id: 'Z122', coords: [119.15, 4.38, 354.69] },
    { type: 1, id: 'Z123', coords: [119.15, 4.38, 356.08] },
    { type: 1, id: 'Z124', coords: [119.15, 4.38, 360.09] },
    { type: 1, id: 'Z125', coords: [119.15, 4.38, 361.47] },
    { type: 1, id: 'Z126', coords: [119.15, 4.38, 365.49] },
    { type: 1, id: 'Z127', coords: [119.15, 4.38, 366.85] },
    { type: 1, id: 'Z128', coords: [119.15, 4.38, 370.87] },
    { type: 1, id: 'Z129', coords: [117.34, 4.38, 376.48] },
    { type: 1, id: 'Z130', coords: [114.5, 4.38, 379.32] },
    { type: 1, id: 'Z131', coords: [113.51, 4.38, 380.31] },
    { type: 1, id: 'Z132', coords: [110.66, 4.38, 383.14] },
    { type: 1, id: 'Z133', coords: [104.96, 4.38, 385.11] },
    { type: 1, id: 'Z134', coords: [100.97, 4.38, 385.11] },
    { type: 1, id: 'Z135', coords: [99.57, 4.38, 385.11] },
    { type: 1, id: 'Z136', coords: [95.53, 4.38, 385.11] },
    { type: 1, id: 'Z137', coords: [94.17, 4.38, 385.11] },
    { type: 1, id: 'Z138', coords: [90.17, 4.38, 385.11] },
    { type: 1, id: 'Z139', coords: [88.77, 4.38, 385.11] },
    { type: 1, id: 'Z140', coords: [84.77, 4.38, 385.11] },
    { type: 1, id: 'Z141', coords: [83.37, 4.38, 385.11] },
    { type: 1, id: 'Z142', coords: [79.37, 4.38, 385.11] },
    { type: 1, id: 'Z143', coords: [77.97, 4.38, 385.11] },
    { type: 1, id: 'Z144', coords: [73.97, 4.38, 385.11] },
    { type: 1, id: 'Z145', coords: [72.57, 4.38, 385.11] },
    { type: 1, id: 'Z146', coords: [68.57, 4.38, 385.11] },
    { type: 1, id: 'Z147', coords: [68.57, 4.38, 388.6] },
    { type: 1, id: 'Z148', coords: [72.57, 4.38, 388.6] },
    { type: 1, id: 'Z149', coords: [73.97, 4.38, 388.6] },
    { type: 1, id: 'Z150', coords: [77.97, 4.38, 388.6] },
    { type: 1, id: 'Z151', coords: [79.37, 4.38, 388.6] },
    { type: 1, id: 'Z152', coords: [83.39, 4.38, 388.6] },
    { type: 1, id: 'Z153', coords: [84.77, 4.38, 388.6] },
    { type: 1, id: 'Z154', coords: [88.77, 4.38, 388.6] },
    { type: 1, id: 'Z155', coords: [90.17, 4.38, 388.6] },
    { type: 1, id: 'Z156', coords: [94.17, 4.38, 388.6] },
    { type: 1, id: 'Z157', coords: [95.56, 4.38, 388.6] },
    { type: 1, id: 'Z158', coords: [99.6, 4.38, 388.6] },
    { type: 1, id: 'Z159', coords: [100.96, 4.38, 388.6] },
    { type: 1, id: 'Z160', coords: [104.98, 4.38, 388.6] },
    { type: 1, id: 'Z161', coords: [110.92, 4.38, 390.74] },
    { type: 1, id: 'Z162', coords: [111.9, 4.38, 391.71] },
    { type: 1, id: 'Z163', coords: [114.7, 4.38, 394.55] },
    { type: 1, id: 'Z164', coords: [115.68, 4.38, 395.54] },
    { type: 1, id: 'Z165', coords: [118.53, 4.38, 398.39] },
    { type: 1, id: 'Z166', coords: [119.98, 4.38, 402.75] },
    { type: 1, id: 'Z167', coords: [119.98, 4.38, 407.35] },
    { type: 1, id: 'Z168', coords: [119.98, 4.38, 408.75] },
    { type: 1, id: 'Z169', coords: [119.98, 4.38, 413.35] },
    { type: 1, id: 'Z170', coords: [119.98, 4.38, 414.75] },
    { type: 1, id: 'Z171', coords: [119.98, 4.38, 419.33] },
    { type: 1, id: 'Z172', coords: [119.98, 4.38, 420.74] },
    { type: 1, id: 'Z173', coords: [119.98, 4.38, 425.01] },
    { type: 1, id: 'Z174', coords: [119.98, 4.38, 426.47] },
    { type: 1, id: 'Z175', coords: [119.98, 4.38, 430.42] },
    { type: 1, id: 'Z176', coords: [121.95, 4.38, 430.42] },
    { type: 1, id: 'Z177', coords: [121.95, 4.38, 426.47] },
    { type: 1, id: 'Z178', coords: [121.95, 4.38, 425.01] },
    { type: 1, id: 'Z179', coords: [121.95, 4.38, 420.74] },
    { type: 1, id: 'Z180', coords: [121.95, 4.38, 419.33] },
    { type: 1, id: 'Z181', coords: [121.95, 4.38, 414.75] },
    { type: 1, id: 'Z182', coords: [121.95, 4.38, 413.35] },
    { type: 1, id: 'Z183', coords: [121.95, 4.38, 408.75] },
    { type: 1, id: 'Z184', coords: [121.95, 4.38, 407.35] },
    { type: 1, id: 'Z185', coords: [121.95, 4.38, 402.75] },
    { type: 1, id: 'Z186', coords: [123.29, 4.38, 398.4] },
    { type: 1, id: 'Z187', coords: [126.15, 4.38, 395.56] },
    { type: 1, id: 'Z188', coords: [127.14, 4.38, 394.57] },
    { type: 1, id: 'Z189', coords: [129.95, 4.38, 391.7] },
    { type: 1, id: 'Z190', coords: [130.93, 4.38, 390.72] },
    { type: 1, id: 'K101', coords: [131.06, 7.68, 383.18] },
    { type: 1, id: 'K102', coords: [128.21, 7.68, 380.36] },
    { type: 1, id: 'K103', coords: [127.23, 7.68, 379.38] },
    { type: 1, id: 'K104', coords: [124.41, 7.68, 376.52] },
    { type: 1, id: 'K105', coords: [122.56, 7.68, 370.9] },
    { type: 1, id: 'K106', coords: [122.56, 7.68, 366.9] },
    { type: 1, id: 'K107', coords: [122.56, 7.68, 365.48] },
    { type: 1, id: 'K108', coords: [122.56, 7.68, 361.5] },
    { type: 1, id: 'K109', coords: [122.56, 7.68, 360.1] },
    { type: 1, id: 'K110', coords: [122.56, 7.68, 356.1] },
    { type: 1, id: 'K111', coords: [122.56, 7.68, 354.7] },
    { type: 1, id: 'K112', coords: [122.56, 7.68, 350.7] },
    { type: 1, id: 'K113', coords: [122.56, 7.68, 349.3] },
    { type: 1, id: 'K114', coords: [122.56, 7.68, 345.3] },
    { type: 1, id: 'K115', coords: [122.56, 7.68, 343.87] },
    { type: 1, id: 'K116', coords: [122.56, 7.68, 339.9] },
    { type: 1, id: 'K117', coords: [119.2, 7.68, 339.9] },
    { type: 1, id: 'K118', coords: [119.2, 7.68, 343.89] },
    { type: 1, id: 'K119', coords: [119.2, 7.68, 345.29] },
    { type: 1, id: 'K120', coords: [119.2, 7.68, 349.29] },
    { type: 1, id: 'K121', coords: [119.2, 7.68, 350.69] },
    { type: 1, id: 'K122', coords: [119.2, 7.68, 354.69] },
    { type: 1, id: 'K123', coords: [119.2, 7.68, 356.08] },
    { type: 1, id: 'K124', coords: [119.2, 7.68, 360.09] },
    { type: 1, id: 'K125', coords: [119.2, 7.68, 361.47] },
    { type: 1, id: 'K126', coords: [119.2, 7.68, 365.49] },
    { type: 1, id: 'K127', coords: [119.2, 7.68, 366.85] },
    { type: 1, id: 'K128', coords: [119.2, 7.68, 370.87] },
    { type: 1, id: 'K129', coords: [117.38, 7.68, 376.51] },
    { type: 1, id: 'K130', coords: [114.54, 7.68, 379.36] },
    { type: 1, id: 'K131', coords: [113.54, 7.68, 380.35] },
    { type: 1, id: 'K132', coords: [110.7, 7.68, 383.18] },
    { type: 1, id: 'K133', coords: [104.96, 7.68, 385.16] },
    { type: 1, id: 'K134', coords: [100.97, 7.68, 385.16] },
    { type: 1, id: 'K135', coords: [99.57, 7.68, 385.16] },
    { type: 1, id: 'K136', coords: [95.53, 7.68, 385.16] },
    { type: 1, id: 'K137', coords: [94.17, 7.68, 385.16] },
    { type: 1, id: 'K138', coords: [90.17, 7.68, 385.16] },
    { type: 1, id: 'K139', coords: [88.77, 7.68, 385.16] },
    { type: 1, id: 'K140', coords: [84.77, 7.68, 385.16] },
    { type: 1, id: 'K141', coords: [83.37, 7.68, 385.16] },
    { type: 1, id: 'K142', coords: [79.37, 7.68, 385.16] },
    { type: 1, id: 'K143', coords: [77.97, 7.68, 385.16] },
    { type: 1, id: 'K144', coords: [73.97, 7.68, 385.16] },
    { type: 1, id: 'K145', coords: [72.57, 7.68, 385.16] },
    { type: 1, id: 'K146', coords: [68.57, 7.68, 385.16] },
    { type: 1, id: 'K147', coords: [68.57, 7.68, 388.55] },
    { type: 1, id: 'K148', coords: [72.57, 7.68, 388.55] },
    { type: 1, id: 'K149', coords: [73.97, 7.68, 388.55] },
    { type: 1, id: 'K150', coords: [77.97, 7.68, 388.55] },
    { type: 1, id: 'K151', coords: [79.37, 7.68, 388.55] },
    { type: 1, id: 'K152', coords: [83.39, 7.68, 388.55] },
    { type: 1, id: 'K153', coords: [84.77, 7.68, 388.55] },
    { type: 1, id: 'K154', coords: [88.77, 7.68, 388.55] },
    { type: 1, id: 'K155', coords: [90.17, 7.68, 388.55] },
    { type: 1, id: 'K156', coords: [94.17, 7.68, 388.55] },
    { type: 1, id: 'K157', coords: [95.56, 7.68, 388.55] },
    { type: 1, id: 'K158', coords: [99.6, 7.68, 388.55] },
    { type: 1, id: 'K159', coords: [100.96, 7.68, 388.55] },
    { type: 1, id: 'K160', coords: [104.98, 7.68, 388.55] },
    { type: 1, id: 'K161', coords: [110.96, 7.68, 390.71] },
    { type: 1, id: 'K162', coords: [111.94, 7.68, 391.68] },
    { type: 1, id: 'K163', coords: [114.74, 7.68, 394.52] },
    { type: 1, id: 'K164', coords: [115.72, 7.68, 395.51] },
    { type: 1, id: 'K165', coords: [118.57, 7.68, 398.35] },
    { type: 1, id: 'K166', coords: [120.03, 7.68, 402.75] },
    { type: 1, id: 'K167', coords: [120.03, 7.68, 407.35] },
    { type: 1, id: 'K168', coords: [120.03, 7.68, 408.75] },
    { type: 1, id: 'K169', coords: [120.03, 7.68, 413.35] },
    { type: 1, id: 'K170', coords: [120.03, 7.68, 414.75] },
    { type: 1, id: 'K171', coords: [120.03, 7.68, 419.33] },
    { type: 1, id: 'K172', coords: [120.03, 7.68, 420.74] },
    { type: 1, id: 'K173', coords: [120.03, 7.68, 425.01] },
    { type: 1, id: 'K174', coords: [120.03, 7.68, 426.47] },
    { type: 1, id: 'K175', coords: [120.03, 7.68, 430.42] },
    { type: 1, id: 'K176', coords: [121.9, 7.68, 430.42] },
    { type: 1, id: 'K177', coords: [121.9, 7.68, 426.47] },
    { type: 1, id: 'K178', coords: [121.9, 7.68, 425.01] },
    { type: 1, id: 'K179', coords: [121.9, 7.68, 420.74] },
    { type: 1, id: 'K180', coords: [121.9, 7.68, 419.33] },
    { type: 1, id: 'K181', coords: [121.9, 7.68, 414.75] },
    { type: 1, id: 'K182', coords: [121.9, 7.68, 413.35] },
    { type: 1, id: 'K183', coords: [121.9, 7.68, 408.75] },
    { type: 1, id: 'K184', coords: [121.9, 7.68, 407.35] },
    { type: 1, id: 'K185', coords: [121.9, 7.68, 402.75] },
    { type: 1, id: 'K186', coords: [123.26, 7.68, 398.36] },
    { type: 1, id: 'K187', coords: [126.11, 7.68, 395.52] },
    { type: 1, id: 'K188', coords: [127.1, 7.68, 394.53] },
    { type: 1, id: 'K189', coords: [129.92, 7.68, 391.66] },
    { type: 1, id: 'K190', coords: [130.89, 7.68, 390.69] },
    { type: 1, id: 'P101', coords: [131.06, 10.98, 383.18] },
    { type: 1, id: 'P102', coords: [128.21, 10.98, 380.36] },
    { type: 1, id: 'P103', coords: [127.23, 10.98, 379.38] },
    { type: 1, id: 'P104', coords: [124.41, 10.98, 376.52] },
    { type: 1, id: 'P105', coords: [122.56, 10.98, 370.9] },
    { type: 1, id: 'P106', coords: [122.56, 10.98, 366.9] },
    { type: 1, id: 'P107', coords: [122.56, 10.98, 365.48] },
    { type: 1, id: 'P108', coords: [122.56, 10.98, 361.5] },
    { type: 1, id: 'P109', coords: [122.56, 10.98, 360.1] },
    { type: 1, id: 'P110', coords: [122.56, 10.98, 356.1] },
    { type: 1, id: 'P111', coords: [122.56, 10.98, 354.7] },
    { type: 1, id: 'P112', coords: [122.56, 10.98, 350.7] },
    { type: 1, id: 'P113', coords: [122.56, 10.98, 349.3] },
    { type: 1, id: 'P114', coords: [122.56, 10.98, 345.3] },
    { type: 1, id: 'P115', coords: [122.56, 10.98, 343.87] },
    { type: 1, id: 'P116', coords: [122.56, 10.98, 339.9] },
    { type: 1, id: 'P117', coords: [119.2, 10.98, 339.9] },
    { type: 1, id: 'P118', coords: [119.2, 10.98, 343.89] },
    { type: 1, id: 'P119', coords: [119.2, 10.98, 345.29] },
    { type: 1, id: 'P120', coords: [119.2, 10.98, 349.29] },
    { type: 1, id: 'P121', coords: [119.2, 10.98, 350.69] },
    { type: 1, id: 'P122', coords: [119.2, 10.98, 354.69] },
    { type: 1, id: 'P123', coords: [119.2, 10.98, 356.08] },
    { type: 1, id: 'P124', coords: [119.2, 10.98, 360.09] },
    { type: 1, id: 'P125', coords: [119.2, 10.98, 361.47] },
    { type: 1, id: 'P126', coords: [119.2, 10.98, 365.49] },
    { type: 1, id: 'P127', coords: [119.2, 10.98, 366.85] },
    { type: 1, id: 'P128', coords: [119.2, 10.98, 370.87] },
    { type: 1, id: 'P129', coords: [117.38, 10.98, 376.51] },
    { type: 1, id: 'P130', coords: [114.54, 10.98, 379.36] },
    { type: 1, id: 'P131', coords: [113.54, 10.98, 380.35] },
    { type: 1, id: 'P132', coords: [110.7, 10.98, 383.18] },
    { type: 1, id: 'P133', coords: [104.96, 10.98, 385.16] },
    { type: 1, id: 'P134', coords: [100.97, 10.98, 385.16] },
    { type: 1, id: 'P135', coords: [99.57, 10.98, 385.16] },
    { type: 1, id: 'P136', coords: [95.53, 10.98, 385.16] },
    { type: 1, id: 'P137', coords: [94.17, 10.98, 385.16] },
    { type: 1, id: 'P138', coords: [90.17, 10.98, 385.16] },
    { type: 1, id: 'P139', coords: [88.77, 10.98, 385.16] },
    { type: 1, id: 'P140', coords: [84.77, 10.98, 385.16] },
    { type: 1, id: 'P141', coords: [83.37, 10.98, 385.16] },
    { type: 1, id: 'P142', coords: [79.37, 10.98, 385.16] },
    { type: 1, id: 'P143', coords: [77.97, 10.98, 385.16] },
    { type: 1, id: 'P144', coords: [73.97, 10.98, 385.16] },
    { type: 1, id: 'P145', coords: [72.57, 10.98, 385.16] },
    { type: 1, id: 'P146', coords: [68.57, 10.98, 385.16] },
    { type: 1, id: 'P147', coords: [68.57, 10.98, 388.55] },
    { type: 1, id: 'P148', coords: [72.57, 10.98, 388.55] },
    { type: 1, id: 'P149', coords: [73.97, 10.98, 388.55] },
    { type: 1, id: 'P150', coords: [77.97, 10.98, 388.55] },
    { type: 1, id: 'P151', coords: [79.37, 10.98, 388.55] },
    { type: 1, id: 'P152', coords: [83.39, 10.98, 388.55] },
    { type: 1, id: 'P153', coords: [84.77, 10.98, 388.55] },
    { type: 1, id: 'P154', coords: [88.77, 10.98, 388.55] },
    { type: 1, id: 'P155', coords: [90.17, 10.98, 388.55] },
    { type: 1, id: 'P156', coords: [94.17, 10.98, 388.55] },
    { type: 1, id: 'P157', coords: [95.56, 10.98, 388.55] },
    { type: 1, id: 'P158', coords: [99.6, 10.98, 388.55] },
    { type: 1, id: 'P159', coords: [100.96, 10.98, 388.55] },
    { type: 1, id: 'P160', coords: [104.98, 10.98, 388.55] },
    { type: 1, id: 'P161', coords: [110.96, 10.98, 390.71] },
    { type: 1, id: 'P162', coords: [111.94, 10.98, 391.68] },
    { type: 1, id: 'P163', coords: [114.74, 10.98, 394.52] },
    { type: 1, id: 'P164', coords: [115.72, 10.98, 395.51] },
    { type: 1, id: 'P165', coords: [118.57, 10.98, 398.35] },
    { type: 1, id: 'P166', coords: [120.03, 10.98, 402.75] },
    { type: 1, id: 'P167', coords: [120.03, 10.98, 407.35] },
    { type: 1, id: 'P168', coords: [120.03, 10.98, 408.75] },
    { type: 1, id: 'P169', coords: [120.03, 10.98, 413.35] },
    { type: 1, id: 'P170', coords: [120.03, 10.98, 414.75] },
    { type: 1, id: 'P171', coords: [120.03, 10.98, 419.33] },
    { type: 1, id: 'P172', coords: [120.03, 10.98, 420.74] },
    { type: 1, id: 'P173', coords: [120.03, 10.98, 425.01] },
    { type: 1, id: 'P174', coords: [120.03, 10.98, 426.47] },
    { type: 1, id: 'P175', coords: [120.03, 10.98, 430.42] },
    { type: 1, id: 'P176', coords: [121.9, 10.98, 430.42] },
    { type: 1, id: 'P177', coords: [121.9, 10.98, 426.47] },
    { type: 1, id: 'P178', coords: [121.9, 10.98, 425.01] },
    { type: 1, id: 'P179', coords: [121.9, 10.98, 420.74] },
    { type: 1, id: 'P180', coords: [121.9, 10.98, 419.33] },
    { type: 1, id: 'P181', coords: [121.9, 10.98, 414.75] },
    { type: 1, id: 'P182', coords: [121.9, 10.98, 413.35] },
    { type: 1, id: 'P183', coords: [121.9, 10.98, 408.75] },
    { type: 1, id: 'P184', coords: [121.9, 10.98, 407.35] },
    { type: 1, id: 'P185', coords: [121.9, 10.98, 402.75] },
    { type: 1, id: 'P186', coords: [123.26, 10.98, 398.36] },
    { type: 1, id: 'P187', coords: [126.11, 10.98, 395.52] },
    { type: 1, id: 'P188', coords: [127.1, 10.98, 394.53] },
    { type: 1, id: 'P189', coords: [129.92, 10.98, 391.66] },
    { type: 1, id: 'P190', coords: [130.89, 10.98, 390.69] },
];
